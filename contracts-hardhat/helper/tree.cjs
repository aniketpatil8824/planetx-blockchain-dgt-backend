const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const Web3Utils = require('web3-utils')

exports.getRootandProof = (leavesArray, index) => {
  const leafNodes = leavesArray.map(leaf => Web3Utils.soliditySha3(leaf))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const rootHash = merkleTree.getHexRoot()
  const claimingAddress = leafNodes[index]
  const hexProof = merkleTree.getHexProof(claimingAddress)
  const response = {
    rootHash,
    hexProof
  }
  return response
}

exports.generateId = (stringId) => {
  return Web3Utils.sha3(stringId)
}
