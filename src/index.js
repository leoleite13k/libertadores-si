const brain = require("brain.js");
const anosAnteriores = require("./data/anosAnteriores.json");
const resultadosAtuais = require("./data/resultadosAtuais.json");
const timesAtuais = require("./data/timesAtuais.json");

const net = new brain.NeuralNetwork();

const results = [];

net.train(anosAnteriores);

resultadosAtuais.map(item => {
  results.push(net.run(item).campeao * 100);
});

results.map((item, index) =>
  console.log(
    `Time: ${timesAtuais[index]} \nPorcentagem: ${item.toFixed(2)}% \n\n`
  )
);
