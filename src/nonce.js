const { SHA256 } = require("crypto-js");

const difficulty = 4;
let nonce = 0;
let hash = "0";

function mineBlock() {
  while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
    nonce++;
    hash = calculaHash();
    console.log(nonce);
    console.log(hash);
    console.log(
      "--------------------------------------------------------------"
    );
  }

  console.log("Nonce: " + nonce);
  console.log("Hash: " + hash);
  return hash;
}

function calculaHash() {
  return SHA256("Blockchain" + nonce).toString();
}

mineBlock();
