// code by Matheus Battisti

const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];
/* --------------------------------------------------------------------------- */
// SELEÇÃO DOS ELEMENTOS DO DOM
/* Os elementos HTML relevantes para a interação são selecionados e armazenados em constantes. Esses elementos são acessados usando document.querySelector com seletores CSS.
 */
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");

const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");
/* --------------------------------------------------------------------------- */
// FUNÇÕES
/* Esta função é responsável por criar dinamicamente a tabela com as classificações de IMC, usando os dados fornecidos no array data. 

Passo a passo:
Iteração sobre data: Para cada item no array, a função:

Cria uma div com a classe "table-data".
Cria três parágrafos (<p>), preenchendo cada um com:
A classificação (item.classification).
A descrição (item.info).
O grau de obesidade (item.obesity).
Montagem da estrutura:

Os parágrafos são adicionados à div com appendChild.
A div finalizada é adicionada ao elemento imcTable.
*/
// criando a tabela
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    //incluindo os paragrafos na div
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    //colocando as informaçoes na tabela
    imcTable.appendChild(div);
  });
}

// função limpeza de valores para botao limpar
function clearInputs() {
  heightInput.value = "";
  weightInput.value = "";
  imcNumber.classList = "";
  imcInfo.classList = "";
}

// função para limitar dígitos nos inputs
function validDigits(text) {
  return text.replace(/[^0-9,]/g, ""); //o g indica que é global
}

//função calcular IMC
function calcImc(weight, height) {
  const imc = (weight / (height * height)).toFixed(1); //1 casa decimal
  return imc;
}

// exibindo e ocultando resultados
function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

/* --------------------------------------------------------------------------- */
// INICIALIZAÇÃO
/* A função createTable é chamada com o array data como argumento, preenchendo a tabela de IMC assim que o script é executado. */
createTable(data);

/* --------------------------------------------------------------------------- */
// EVENTOS [botões começam a funcionar baseado no input do usuário]
[heightInput, weightInput].forEach((element) => {
  element.addEventListener("input", (e) => {
    const updateValue = validDigits(e.target.value);

    e.target.value = updateValue;
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault(); //previne submissao de formulario ao clicar no btn

  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  if (!weight || !height) return;

  const imc = calcImc(weight, height);

  let info;
  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) return;

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  // feedback visual
  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearInputs();
});

backBtn.addEventListener("click", () => {
  clearInputs();
  showOrHideResults();
});
