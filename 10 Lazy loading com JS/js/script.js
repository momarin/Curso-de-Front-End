// JS by Matheus Battisti

// selecionando variaveis
const images = document.querySelectorAll(".image-container img");

//alterando as imagens
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const image = entry.target;

    image.src = image.src.replace("?w=10&", "?w=1000&");

    observer.unobserve(image);
  });
}, {});

// ativando a observação das imagens
images.forEach((image) => {
  observer.observe(image);
});
