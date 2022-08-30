const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    // O bloco genesis é o primeiro bloco, que servirá de base para a criação dos próximos blocos
    const genesisDate = new Date();
    return new Block("Genesis Block", 0, genesisDate, "0");
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewBlock(newBlock) {
    // Essa função irá adicionar o bloco na cadeia, dando um push no array 'chain'
    newBlock.previousHash = this.getLastBlock().hash;
    newBlock.index = this.getLastBlock().index + 1;
    newBlock.hash = newBlock.calculaHash();

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    const chain = this.chain;

    for (let i = 0; i < chain.length; i++) {
      if (chain[i].hash !== chain[i].calculaHash()) {
        console.log(`Bloco ${i} foi corrompido..`);
        console.log("-");
        console.log(`hash base - antes da alteração: ` + chain[i].hash);
        console.log(
          `hash modificado - depois da alteração: ` + chain[i].calculaHash()
        );
        console.log(
          "--------------------------------------------------------------"
        );
        return false;
      }

      if (i > 0 && chain[i].previousHash !== chain[i - 1].hash) {
        console.log(`Bloco ${i - 1} foi corrompido.`);
        console.log("-");
        console.log(`previous hash do bloco atual: ` + chain[i].previousHash);
        console.log(`hash do bloco anterior: ` + chain[i].calculaHash());
        console.log(
          "--------------------------------------------------------------"
        );

        return false;
      }
    }

    console.log("Chain is valid !!");
    console.log(
      "--------------------------------------------------------------"
    );
    return true;
  }
}

let blocksToAdd = 3;
const PolyChain = new Blockchain();

// Irá adicionar bloco a bloco
for (i = 0; i < blocksToAdd; i++) {
  PolyChain.addNewBlock(
    new Block({
      sender: "caio",
      receiver: "marcelo",
      message: `Bloco ${PolyChain.chain.length} foi adicionado à cadeia.`,
    })
  );
}

console.log(PolyChain.isChainValid()); // Até aqui, tudo é válido, nada incomum

// CASOS DE TESTE - ALTERAÇÃO DE DADOS EXISTENTES NO BLOCO

// PolyChain.chain[2].data = {
//   sender: "Caio",
//   receiver: "Raimir",
//   message: "O sistema foi invadido.",
// };

// PolyChain.chain[2].hash = 'dsagdashdashdasdfh831283'

PolyChain.chain.forEach((block) => {
  console.log(block);
  console.log("-");
  console.log(`hash calculado: ${block.calculaHash()}`);
  console.log("--------------------------------------------------------------");
});

console.log(PolyChain.isChainValid());
