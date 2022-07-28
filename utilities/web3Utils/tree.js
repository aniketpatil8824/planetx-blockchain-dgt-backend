import _MerkleTree from 'merkletreejs'
import web3Utils from 'web3-utils'

const MerkleTree = _MerkleTree.default

const { keccak256, sha3, soliditySha3 } = web3Utils
export const getRootandProof = (leavesArray, index) => {
  const leafNodes = leavesArray.map(leaf => soliditySha3(leaf))
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

export const generateId = (username) => {
  return sha3(username)
}
