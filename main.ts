import { calls1 } from "./calls1";

const { ApiPromise, WsProvider } = require("@polkadot/api");

function toCamelCase(str) {
  return str
    .split("_")
    .map((word, index) => {
      // For the first word, keep it as is but ensure it's in lowercase
      if (index === 0) {
        return word.toLowerCase();
      }
      // For subsequent words, capitalize the first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

async function encodeJSON() {
  const wsProvider = new WsProvider("wss://kusama-asset-hub-rpc.polkadot.io");
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;

  calls1.map(({ value }) => {
    value.map(({ call_index, call_module, call_name, params }) => {
      console.log(call_module, call_name, params);
      const formattedArgs = params.map((arg) => arg.value);

      const extrinsic = api.tx[toCamelCase(call_module)][
        toCamelCase(call_name)
      ](...formattedArgs);
      const extrinsicHex = extrinsic.toHex();
    });
  });
}

encodeJSON();
