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
        while (_) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var calls1_1 = require("./calls1");
var calls2_1 = require("./calls2");
var fs = require('fs');
var _a = require("@polkadot/api"), ApiPromise = _a.ApiPromise, WsProvider = _a.WsProvider;
var ipfsLinkMappings = {
    'ipfs://ipfs/bafkreicisbw7khk2gbmpk42kp6jedzeen7hinvmooxf4axo3tw4xuh3dim': 'ipfs://ipfs/QmazTCAz6FBKjDhAP3n6FBqpc1UCBjBGdqpXi5DNCETKH3',
    'ipfs://ipfs/bafkreig7uaaosolevcbixzwhd3y4qd4vg34prntzzejkjd4li27c62uypy': 'ipfs://ipfs/QmPuWqbqEyyCNc8LN5ZHrFrfk4Zww9Md9k1FDwmvCYefie',
    'ipfs://ipfs/bafkreiebalpllsy7zqrabmnnricuwoiifjzcnhzx3zlk7gcrahzwlflvfa': 'ipfs://ipfs/QmazTCAz6FBKjDhAP3n6FBqpc1UCBjBGdqpXi5DNCETKH3',
    'ipfs://ipfs/bafkreidedzwdpu3wjbzn67nyv6gtzadlehy3deloqfizl3hxbrqqwbaetm': 'ipfs://ipfs/QmVHreEGgUjSs8F264Jo87RSwyaj7MwdH6eacyrkxGXhML',
    'ipfs://ipfs/bafkreidpi55n4lhjsn45eg6jopsiwptenyqarl7pyfg2xa52erpt4qhvwe': 'ipfs://ipfs/QmazTCAz6FBKjDhAP3n6FBqpc1UCBjBGdqpXi5DNCETKH3',
    'ipfs://ipfs/bafkreiguuvdtqkgnuiz54shpccrtitcdh726u4kl6ksaichetnisdsifci': 'ipfs://ipfs/QmPuWqbqEyyCNc8LN5ZHrFrfk4Zww9Md9k1FDwmvCYefie',
    'ipfs://ipfs/bafkreidkvi7k5njyw5lfv5xlbye5jjyqpf7vkpd3ggoyk4oa4vbc74c64i': 'ipfs://ipfs/QmazTCAz6FBKjDhAP3n6FBqpc1UCBjBGdqpXi5DNCETKH3',
    'ipfs://ipfs/bafkreifzmohj6vjyy52rnsrkxw4t3djpbal3n5bmg7r22n4ovl5e3z3v5i': 'ipfs://ipfs/QmVHreEGgUjSs8F264Jo87RSwyaj7MwdH6eacyrkxGXhML'
};
// Recursive function to collect unique IPFS links
function collectUniqueIPFSLinks(data, ipfsLinks) {
    if (Array.isArray(data)) {
        data.forEach(function (item) { return collectUniqueIPFSLinks(item, ipfsLinks); });
    }
    else if (typeof data === 'object' && data !== null) {
        for (var key in data) {
            collectUniqueIPFSLinks(data[key], ipfsLinks);
        }
    }
    else if (typeof data === 'string' && data.startsWith('ipfs://')) {
        ipfsLinks.add(data); // Add the IPFS link to the Set
    }
}
function encodeJSON() {
    return __awaiter(this, void 0, void 0, function () {
        var wsProvider, api, setMetadataCalls, calls, finalCall, encodedCall, filePath;
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
                    setMetadataCalls = __spreadArray(__spreadArray([], calls1_1.calls1[0].value.filter(function (call) { return call.call_name === "set_metadata"; }), true), calls2_1.calls2[0].value.filter(function (call) { return call.call_name === "set_metadata"; }), true);
                    calls = [];
                    setMetadataCalls.forEach(function (call) {
                        var params = call.params;
                        var collectionValue;
                        var itemValue;
                        var newMetadata;
                        var oldMetadata;
                        // Extract collection and item values
                        if (params) {
                            params.forEach(function (param) {
                                if (param.name === 'data' && ipfsLinkMappings[param.value]) {
                                    oldMetadata = param.value;
                                    newMetadata = ipfsLinkMappings[param.value];
                                }
                                else if (param.name === 'collection') {
                                    collectionValue = param.value;
                                }
                                else if (param.name === 'item') {
                                    itemValue = param.value;
                                }
                            });
                            // console.log("Collection Value:", collectionValue);
                            // console.log("Item Value:", itemValue);
                            // console.log("Old metadata:", oldMetadata);
                            // console.log("New metadata:", newMetadata);
                        }
                        else {
                            console.log("params is undefined");
                        }
                        var newCall = api.tx.nfts.setMetadata(collectionValue, itemValue, newMetadata);
                        calls.push(newCall);
                    });
                    console.log("No of txs", calls.length);
                    finalCall = api.tx.utility.batchAll(calls);
                    encodedCall = finalCall.toHex();
                    filePath = './output.txt';
                    // Write the encodedCall to the file
                    fs.writeFileSync(filePath, encodedCall, 'utf-8');
                    console.log("Encoded call has been written to ".concat(filePath));
                    return [2 /*return*/];
            }
        });
    });
}
// uncomment below to get all unique ipfs links in calls1
// // Create a Set to store unique IPFS links
// const uniqueIPFSLinks = new Set();
// // Use the function to collect unique IPFS links from calls1
// collectUniqueIPFSLinks(calls1, uniqueIPFSLinks);
// // Convert the Set to an array (if needed)
// console.log(uniqueIPFSLinks);
encodeJSON();
