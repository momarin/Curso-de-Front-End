// -------------------------- Seleção de Elementos
// características da sombra
const horizontal = document.querySelector("#horizontal");
const horizontalReference = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalReference = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurReference = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadReference = document.querySelector("#spread-value");
const color = document.querySelector("#color");
const colorReference = document.querySelector("#color-value");
const opacity = document.querySelector("#opacity");
const opacityReference = document.querySelector("#opacity-value");

const inset = document.querySelector("#inset");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

// -------------------------- Classe BoxShadowGenerator
// classe responsável por controlar todos os comportamentos do box shadow generator
class BoxShadowGenerator {
  constructor(
    horizontal,
    horizontalReference,
    vertical,
    verticalReference,
    blur,
    blurReference,
    spread,
    spreadReference,
    color,
    colorReference,
    opacity,
    opacityReference,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule
  ) {
    this.horizontal = horizontal;
    this.horizontalReference = horizontalReference;
    this.vertical = vertical;
    this.verticalReference = verticalReference;
    this.blur = blur;
    this.blurReference = blurReference;
    this.spread = spread;
    this.spreadReference = spreadReference;
    this.color = color;
    this.colorReference = colorReference;
    this.opacity = opacity;
    this.opacityReference = opacityReference;
    this.inset = inset;
    this.insetReference = inset.checked;
    this.previewBox = previewBox;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
  }

  // métodos da classe
  initialize() {
    this.horizontalReference.value = this.horizontal.value;
    this.verticalReference.value = this.vertical.value;
    this.blurReference.value = this.blur.value;
    this.spreadReference.value = this.spread.value;
    this.colorReference.value = this.color.value;
    this.opacityReference.value = this.opacity.value;

    this.applyRule();
    this.showRule();
  }

  // regras()
  applyRule() {
    const rgbValue = this.hexToRgb(this.colorReference.value);

    const shadowRule = `${this.insetReference ? "inset" : ""} ${
      this.horizontalReference.value
    }px ${this.verticalReference.value}px ${this.blurReference.value}px ${
      this.spreadReference.value
    }px rgba(${rgbValue}, ${this.opacityReference.value})`;

    this.previewBox.style.boxShadow = shadowRule;
    this.currentRule = shadowRule;
  }

  showRule() {
    this.rule.innerText = this.currentRule;
    this.webkitRule.innerText = this.currentRule;
    this.mozRule.innerText = this.currentRule;
  }

  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalReference.value = value;
        break;
      case "vertical":
        this.verticalReference.value = value;
        break;
      case "blur":
        this.blurReference.value = value;
        break;
      case "spread":
        this.spreadReference.value = value;
        break;
      case "color":
        this.colorReference.value = value;
        break;
      case "opacity":
        this.opacityReference.value = value;
        break;
      case "inset":
        this.insetReference = value;
        break;
    }

    this.applyRule();
    this.showRule();
  }

  // convertendo cor de hexadecimal para rgb()
  hexToRgb(hex) {
    return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
      ("0x" + hex[5] + hex[6]) | 0
    }`;
  }
}

// -------------------------- Instância da Classe
const boxShadow = new BoxShadowGenerator(
  horizontal,
  horizontalReference,
  vertical,
  verticalReference,
  blur,
  blurReference,
  spread,
  spreadReference,
  color,
  colorReference,
  opacity,
  opacityReference,
  inset,
  previewBox,
  rule,
  webkitRule,
  mozRule
);

// -------------------------- Inicialização
boxShadow.initialize();
console.log(boxShadow);
// -------------------------- Eventos
const inputs = [
  { element: horizontal, property: "horizontal" },
  { element: vertical, property: "vertical" },
  { element: blur, property: "blur" },
  { element: spread, property: "spread" },
];

inputs.forEach(({ element, property }) => {
  element.addEventListener("input", (e) => {
    const value = e.target.value;
    boxShadow.updateValue(property, value);
  });
});

color.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("color", value);
});

opacity.addEventListener("input", (e) => {
  const value = e.target.value;

  boxShadow.updateValue("opacity", value);
});
inset.addEventListener("input", (e) => {
  const value = e.target.checked;

  boxShadow.updateValue("inset", value);
});

// copiar regra
const rulesArea = document.querySelector("#rules-area")
const copyInstructions = document.querySelector("#copy-instructions")

rulesArea.addEventListener("click", () => {
  const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");
  //regra acima é para remover as linhas em branco do console e substituir por string vazia
  navigator.clipboard.writeText(rules).then(() => {
    copyInstructions.innerText = "Regra copiada com sucesso!";

    setTimeout(() => {
      copyInstructions.innerText = "Clique no quadro acima para copiar as regras"
    }, 1500);
  })
})