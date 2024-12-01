const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const name = 'Mr. Otis Koelpin III'
  const MERKLE_TREE = new MerkleTree(niceList)
  const index = niceList.findIndex(n => n === name);
  const proof = MERKLE_TREE.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
    proof: proof,

  });

  console.log({ gift });
}

main();