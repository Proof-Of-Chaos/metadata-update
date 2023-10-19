"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var calls1_1 = require("./calls1");
var _a = require("@polkadot/api"), ApiPromise = _a.ApiPromise, WsProvider = _a.WsProvider;
// const wsProvider = new WsProvider("wss://kusama-asset-hub-rpc.polkadot.io");
// const api = await ApiPromise.create({ provider: wsProvider });
// const extrinsic = api.tx[callModule][callMethod](...Object.values(args));
// const extrinsicHex = extrinsic.toHex();
// console.log(extrinsicHex);
function toCamelCase(str) {
    return str
        .split("_")
        .map(function (word, index) {
        // For the first word, keep it as is but ensure it's in lowercase
        if (index === 0) {
            return word.toLowerCase();
        }
        // For subsequent words, capitalize the first letter
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
        .join("");
}
function encodeJSON() {
    return __awaiter(this, void 0, void 0, function () {
        var wsProvider, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wsProvider = new WsProvider("wss://kusama-asset-hub-rpc.polkadot.io");
                    return [4 /*yield*/, ApiPromise.create({ provider: wsProvider })];
                case 1:
                    api = _a.sent();
                    return [4 /*yield*/, api.isReady];
                case 2:
                    _a.sent();
                    calls1_1.calls1.map(function (_a) {
                        //   const { call_index } = value;
                        //   console.log(value);
                        var value = _a.value;
                        value.map(function (_a) {
                            var _b;
                            var call_index = _a.call_index, call_module = _a.call_module, call_name = _a.call_name, params = _a.params;
                            console.log(call_module, call_name, params);
                            var formattedArgs = params.map(function (arg) { return arg.value; });
                            //   console.log(Object.keys(api.tx));
                            //   console.log(Object.keys(api.tx[toCamelCase(call_module)]));
                            //   console.log(
                            //     Object.keys(api.tx[toCamelCase(call_module)][toCamelCase(call_name)])
                            //   );
                            //   console.log(formattedArgs);
                            var extrinsic = (_b = api.tx[toCamelCase(call_module)])[toCamelCase(call_name)].apply(_b, formattedArgs);
                            var extrinsicHex = extrinsic.toHex();
                            console.log(extrinsicHex);
                            //   const extrinsic = api.tx.nfts?.[call_name.toLowerCase()](params);
                            //   const extrinsicHex = extrinsic.toHex();
                            //   console.log(extrinsicHex);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
encodeJSON();
