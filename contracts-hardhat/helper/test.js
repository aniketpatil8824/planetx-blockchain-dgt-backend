const { getRootandProof, generateId } = require('./tree.cjs')

const id = generateId('Abhijith')
const response = getRootandProof([10], 0)
console.log({ id, response })
