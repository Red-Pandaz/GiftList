const express = require('express');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json')
const MerkleTree = require('../utils/MerkleTree')

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_TREE = new MerkleTree(niceList)
const MERKLE_ROOT = MERKLE_TREE.getRoot()  

app.post('/gift', (req, res) => {

  const body = req.body;
  const name = body.name
  const proof = body.proof


  const isInTheList = verifyProof(proof, name, MERKLE_ROOT)

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
