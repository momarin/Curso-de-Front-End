//JS by Matheus Battisti

/* -------------------------------------------- */
//Seleção de elementos
/* -------------------------------------------- */
const multiplicationForm = document.querySelector("#multiplication-form");
const numberInput = document.querySelector("#number");
const multiplicationInput = document.querySelector("#multiplicator");
const multiplicationTitle = document.querySelector("#multiplication-title span");
const multiplicationTable = document.querySelector(
  "#multiplication-operations"
);

/* -------------------------------------------- */
// Funções
/* -------------------------------------------- */
const createTable = (number, multiplicatorNumber) => {
  multiplicationTable.innerHTML = ""; //limpando html

  //fazendo a tabuada
  for (i = 1; i <= multiplicatorNumber; i++) {
    const result = number * i;

    //criando o template
    const template = `<div class="row">
    <div class="operation">${number} x ${i} =</div>
    <div class="result">${result}</div>
    </div>`;

    const parser = new DOMParser(); //transferindo DOM pro html
    const htmlTemplate = parser.parseFromString(template, "text/html");
    const row = htmlTemplate.querySelector(".row");

    multiplicationTable.appendChild(row);
  }

  multiplicationTitle.innerText = number;
};

/* -------------------------------------------- */
// Eventos
/* -------------------------------------------- */
multiplicationForm.addEventListener("submit", (e) => {
  e.preventDefault(); //prevencao do padrao de enviar o form

  const multiplicationNumber = +numberInput.value; //o + transform o num em int
  const multiplicatorNumber = +multiplicationInput.value;

  if (!multiplicationNumber || !multiplicatorNumber) return; //precisa ter os dois numeros para retornar no console

  //   console.log(multiplicationNumber, multiplicatorNumber);

  // Chamada para limpar o HTML
  createTable(multiplicationNumber, multiplicatorNumber);
});
