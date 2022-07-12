import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import Web3Utils from 'web3-utils'

const whitelistAddresses = [0, 5]
const leafNodes = whitelistAddresses.map(addr => Web3Utils.soliditySha3(addr))
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
const rootHash = merkleTree.getHexRoot()
console.log('Whitelist Merkle Tree\n', merkleTree.toString())
console.log('Root Hash: ', rootHash)
const claimingAddress = leafNodes[1]
const hexProof = merkleTree.getHexProof(claimingAddress)
console.log({ Proof: hexProof })
// console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));

/*

["0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"]

{5:10} {15:3} {25:42} {35:102} {45:200} {55:1} {65:70}

*/
