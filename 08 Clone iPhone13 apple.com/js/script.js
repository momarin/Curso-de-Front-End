// selecao dos elementos
const buttons = document.querySelectorAll("#image-picker li");
const image = document.querySelector("#product-image");

// alocando eventos
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e);

    //removendo a marcação de selected
    buttons.forEach((btn) => {
      btn.querySelector(".color").classList.remove("selected");
    });

    //adicionando a classe selected no botao clicado
    const button = e.target;
    const id = button.getAttribute("id");

    button.querySelector(".color").classList.add("selected");

    //alterando a imagem que aparecerá para cada botao
    //setando transparencia com a classe changing para dar uma percepção de "movimentação na mudança"
    image.classList.add("changing");
    //alterando a imagem de acordo com cada botao
    image.setAttribute("src", `img/iphone_${id}.jpg`);

    //removendo transparencia
    setTimeout(() => {
      image.classList.toggle("changing");
    }, 200);
  });
});
