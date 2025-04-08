# Gerador de Shadow Box
# Este é um projeto extremamente interativo que visa transformar, em regras de CSS, as interações que o usuário faz na shadowbox, traduzindo a posição da sombra e suas características seus respectivos valores em px.

- Contém HTML, CSS3, JavaScript;

- Funcionalidades do projeto:
    - Gerador de shadow box com deslocamento horizontal e vertica;
    - Aplicação de blur, spread, opacity e sombra interna.
    - Disponibilização da numeração do range, em px, para o usuário por meio de input type text;
    - Input type color para disponibilização de grid de cores para aplicação na sombra;
    - Disponibilização do hexadecimal da cor para o usuário;
    - Input de checkbox para verificação com o usuário;
    - Caixa com as regras de CSS escolhidas nas barras de range visíveis para o usuário em forma de texto;
    - Função de copiar conteúdo da caixa;

- Alterações em relação ao projeto inicial:
    - visual: mudanças na cor principal e no estilo da barra de range
    - JS levemente diferente, com algumas partes do código melhoradas (repetições transformadas em loop);
    - Reorganização total do código JS baseada em:
        (1) Seleção de Elementos no Topo
        (2) Estrutura e Comentários
        (3) Remoção de duplicações
        - Essa organização acarreta em melhores: legibilidade, manutenção, modularização e reutilização;

- Principais elementos de CSS:
    - Estilização feita por meio de de id;
    - Remoção de estilo padrão do input "range" dos navegadores mais comuns (chrome e opera);
    - Responsividade para Mobile (breakpoint <= 576px, de acordo com padrão do Bootstrap 5);

- Principais elementos de JS:
    - Uso de classe;
    - Criação de métodos para a classe;
    - Uso de construtor;
    - Instanciação de objeto;
    - Eventos de input em loop.

- Projeto do curso Aprenda Front-End, ministrado por Matheus Battistti e disponibilizado pelo UDEMY.