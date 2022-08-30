const { SHA256 } = require("crypto-js");

// Essa classe representa 1 bloco da cadeia, apenas um bloco.
class Block {
  constructor(data, index, timestamp = new Date(), previousHash) {
    this.data = data;
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculaHash();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculaHash();
    }

    console.log(`Bloco ${this.index + 1} minerado: ${this.hash}`);
    console.log("-");
  }

  calculaHash() {
    // esse método criará um hash em sha256 de acordo com os parâmetros passados
    return SHA256(
      JSON.stringify(this.data) +
        this.index +
        this.timestamp +
        this.previousHash +
        this.nonce
    ).toString();
  }
}

module.exports = Block;
