// Importando a biblioteca
const brain = require("brain.js");
// Json com Lista de Treinos com jogos de anos anteriores
const anosAnteriores = require("./data/anosAnteriores.json");
// Json com Lista de Jogos não usadas nos treinos para realizar os testes de previsão
const resultadosAtuais = require("./data/resultadosAtuais.json");
// Json com Lista de Times referentes aos jogos da lista acima
const timesAtuais = require("./data/timesAtuais.json");

// Intanciando a rede neural com as configurações padrão para feedforward com backpropagation
// iterations: 20000, quantidade máxima para iterar os dados de treinamento
// errorThresh: 0.005, é a porcentagem de erro aceitável dos dados de treinamento
// log: false, true para usar console.log, quando uma função é fornecida, é usada
// logPeriod: 10, iterações entre logout
// learningRate: 0.3,  multiplica de encontro à entrada e o delta então adiciona ao momentum
// momentum: 0.1, multiplica de acordo com a "mudança" especificada e, em seguida, aumenta a taxa de aprendizado para mudança
// callback: null, uma chamada periódica que pode ser acionada durante o treinamento
// callbackPeriod: 10, o número de iterações pelos dados de treinamento entre as chamadas de retorno de chamada
// timeout: Infinity, o número máximo de milissegundos para treinar
const net = new brain.NeuralNetwork();

const results = [];
const totalResult = [];
const ganhador = {
  time: "",
  porc: 0
};
let porcent = 0;
let maior = 0;

// Realizando treinamento com jogos de anos anteriores
let trainResult = net.train(anosAnteriores, {
  iterations: 20000,
  errorThresh: 0.005,
  logPeriod: 1,
  learningRate: 0.7,
  momentum: 0.1,
  // log: true, // Se Habilitado mostra as iterrações sendo realizadas e seu retorno
  timeout: Infinity
});

console.log(
  ` Dados de treino: \n   Erro: ${trainResult.error} \n   Iterações: ${
    trainResult.iterations
  } \n`
);

// Realizando testes com jogos atuais em relação a rede neural treinada
resultadosAtuais.map(item => {
  results.push(net.run(item).campeao * 100);
});

// Somando o total de cada teste realizado com a rede neural treinada
results.map(item => {
  porcent = item + porcent;
});

// Fazendo a procentagem de change para ser campeão em relação aos times Atuais
results.map(item => {
  totalResult.push((item * 100) / porcent);
});

// Imprimindo resultado em percentagem
totalResult.map((item, index) => {
  if (item > maior) {
    ganhador.time = timesAtuais[index];
    ganhador.porc = item.toFixed(2);

    maior = item;
  }
  console.log(
    ` Time: ${timesAtuais[index]} \n Porcentagem: ${item.toFixed(2)}% \n`
  );
});

// Imprimindo possível campeão
console.log(
  ` ----------------------------------
  Possível campeão : ${ganhador.time}
  Porcentagem: ${ganhador.porc}%
 ----------------------------------\n`
);
