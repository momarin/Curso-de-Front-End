/* ---------------------------------------------------------------------- */
// Seleção de elementos para utilização das funções
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// Novas funcionalidades
// botao que abre ou fecha a geração de senha
const openCloseGeneratorButton = document.querySelector(
  "#open-generate-password"
);
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const letterInput = document.querySelector("#letters");
const numberInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");
/* ---------------------------------------------------------------------- */
// Funções
// Letras, Números e Símbolos //codegrepper.com
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%&*+-";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumber,
  getSymbol
) => {
  let password = "";

  //segunda versão [mapeando dados que o usuário forneceu]
  const passwordLength = +lengthInput.value;
  const generators = [
    // getLetterLowerCase,
    // getLetterUpperCase,
    // getNumber,
    // getSymbol,
  ];

  if (letterInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numberInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  console.log(generators.length);
  if (generators.length === 0) {
    return;
  }

  for (i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }
  password = password.slice(0, passwordLength);

  // fazendo a geração de senha aparecer na tela
  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};

/* ---------------------------------------------------------------------- */
// Eventos
generatePasswordButton.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
  );
});

//evento de abrir/fechar div das opções
openCloseGeneratorButton.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

//evento de click no botao copiar
copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPasswordElement.querySelector("h4").innerText;

  //api navigator transfere o copiar para o ctrl C
  navigator.clipboard.writeText(password).then(() => {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";

    //voltando ao texto original
    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 1000);
  });
});

/* ---------------------------------------------------------------------- */
