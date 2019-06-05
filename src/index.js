const brain = require("brain.js");
const timesAnosAnteriores = require("./data/timesAnosAnteriores.json");

const net = new brain.NeuralNetwork();

net.train(timesAnosAnteriores);

const output = net.run({
  pontos: 16,
  saldoGols: 12,
  golsPro: 12
});

console.log(output.campeao * 100);
