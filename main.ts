import { calls1 } from "./calls1";
import { calls2 } from "./calls2";
const fs = require('fs');

const { ApiPromise, WsProvider } = require("@polkadot/api");

// IPFS CIDs are in the following order
// Common direct
// Common direct 95%
// Common delegated 95%
// Common delegated
// Rare direct
// Rare delegated
// Epic direct
// Epic delegated

const ipfsLinkMappings = {
  'ipfs://ipfs/bafkreicisbw7khk2gbmpk42kp6jedzeen7hinvmooxf4axo3tw4xuh3dim': 'ipfs://ipfs/QmTVRe7ry2ucnzNFa9UY32W5WT5osp1Ujor98EUTGNDKNc',
  'ipfs://ipfs/bafkreiebalpllsy7zqrabmnnricuwoiifjzcnhzx3zlk7gcrahzwlflvfa': 'ipfs://ipfs/QmTVRe7ry2ucnzNFa9UY32W5WT5osp1Ujor98EUTGNDKNc',
  'ipfs://ipfs/bafkreidpi55n4lhjsn45eg6jopsiwptenyqarl7pyfg2xa52erpt4qhvwe': 'ipfs://ipfs/QmTVRe7ry2ucnzNFa9UY32W5WT5osp1Ujor98EUTGNDKNc',
  'ipfs://ipfs/bafkreidkvi7k5njyw5lfv5xlbye5jjyqpf7vkpd3ggoyk4oa4vbc74c64i': 'ipfs://ipfs/QmTVRe7ry2ucnzNFa9UY32W5WT5osp1Ujor98EUTGNDKNc',
  'ipfs://ipfs/bafkreidedzwdpu3wjbzn67nyv6gtzadlehy3deloqfizl3hxbrqqwbaetm': 'ipfs://ipfs/QmRQLheQ8hDf8k1Wtk41jB1crMAhLqUeW9ueM59MAd1DUT',
  'ipfs://ipfs/bafkreifzmohj6vjyy52rnsrkxw4t3djpbal3n5bmg7r22n4ovl5e3z3v5i': 'ipfs://ipfs/QmRQLheQ8hDf8k1Wtk41jB1crMAhLqUeW9ueM59MAd1DUT',
  'ipfs://ipfs/bafkreig7uaaosolevcbixzwhd3y4qd4vg34prntzzejkjd4li27c62uypy': 'ipfs://ipfs/QmUoBzp6dQEwNhedfcLBcuygUryPDFk3wMpapBsSqNg5Ky',
  'ipfs://ipfs/bafkreiguuvdtqkgnuiz54shpccrtitcdh726u4kl6ksaichetnisdsifci': 'ipfs://ipfs/QmUoBzp6dQEwNhedfcLBcuygUryPDFk3wMpapBsSqNg5Ky',
};

// Recursive function to collect unique IPFS links
function collectUniqueIPFSLinks(data, ipfsLinks) {
  if (Array.isArray(data)) {
    data.forEach(item => collectUniqueIPFSLinks(item, ipfsLinks));
  } else if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      collectUniqueIPFSLinks(data[key], ipfsLinks);
    }
  } else if (typeof data === 'string' && data.startsWith('ipfs://')) {
    ipfsLinks.add(data); // Add the IPFS link to the Set
  }
}


async function encodeJSON() {
  const wsProvider = new WsProvider("wss://kusama-asset-hub-rpc.polkadot.io");
  const api = await ApiPromise.create({ provider: wsProvider });
  await api.isReady;

  let setMetadataCalls = [...calls1[0].value.filter(call => call.call_name === "set_metadata"),
  ...calls2[0].value.filter(call => call.call_name === "set_metadata")];

  let calls: any[] = []
  setMetadataCalls.forEach(call => {
    const { params } = call;

    let collectionValue;
    let itemValue;
    let newMetadata;
    let oldMetadata;
    // Extract collection and item values
    if (params) {
      params.forEach((param) => {
        if (param.name === 'data' && ipfsLinkMappings[param.value]) {
          oldMetadata = param.value;
          newMetadata = ipfsLinkMappings[param.value];
        } else if (param.name === 'collection') {
          collectionValue = param.value;
        } else if (param.name === 'item') {
          itemValue = param.value;
        }
      });

      // console.log("Collection Value:", collectionValue);
      // console.log("Item Value:", itemValue);
      // console.log("Old metadata:", oldMetadata);
      // console.log("New metadata:", newMetadata);

    } else {
      console.log("params is undefined");
    }

    let newCall = api.tx.nfts.setMetadata(
      collectionValue,
      itemValue,
      newMetadata
    );

    calls.push(newCall)
  });

  console.log("No of txs", calls.length)

  const finalCall = api.tx.utility.batchAll(calls);
  const encodedCall = finalCall.toHex();

  // Specify the file path
  const filePath = './output.txt';

  // Write the encodedCall to the file
  fs.writeFileSync(filePath, encodedCall, 'utf-8');

  console.log(`Encoded call has been written to ${filePath}`);


}

// uncomment below to get all unique ipfs links in calls1
// // Create a Set to store unique IPFS links
// const uniqueIPFSLinks = new Set();

// // Use the function to collect unique IPFS links from calls1
// collectUniqueIPFSLinks(calls1, uniqueIPFSLinks);

// // Convert the Set to an array (if needed)

// console.log(uniqueIPFSLinks);

encodeJSON();

