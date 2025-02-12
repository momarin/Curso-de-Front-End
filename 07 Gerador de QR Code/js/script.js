//code by Matheus Battisti

// ----------------- Declarando variaveis -----------------
const container = document.querySelector(".container");
const qrCodeBtn = document.querySelector("#qr-form button");
const qrCodeInput = document.querySelector("#qr-form input");
const qrCodeImg = document.querySelector("#qr-code img");

// ----------------- Eventos -----------------
// gerando QR Code
function generateQrCode() {
  const qrCodeInputValue = qrCodeInput.value;
  //   console.log(qrCodeInputValue);

  // validando o input
  if (!qrCodeInputValue) return;

  qrCodeBtn.innerText = "Gerando código..."; //altera ao clicar no btn

  // chamando api
  qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;

  // disparar evento e mostrar o active apenas qnd a imagem carregar
  qrCodeImg.addEventListener("load", () => {
    container.classList.add("active");
    qrCodeBtn.innerText = "Código gerado!";
  });
}

// gerar qr code ao apertar botao com o click do mouse
qrCodeBtn.addEventListener("click", () => {
  generateQrCode();
});

// gerar qr code ao apertar a tecla Enter
qrCodeInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    generateQrCode();
  }
});

// ----------------- Limpando área do QR Code -----------------
qrCodeInput.addEventListener("keyup", () => {
    if(!qrCodeInput.value) {
        container.classList.remove("active");
        qrCodeBtn.innerText = "Gerar QR Code...";
    }
})
