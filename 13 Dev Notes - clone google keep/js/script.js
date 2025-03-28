/* ----------------------- Seleção de Elementos ----------------------- */
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");
const searchInput = document.querySelector("#search-input");
const exportBtn = document.querySelector("#export-notes");
/* ----------------------------- Funções ----------------------------- */
function showNotes() {
  cleanNotes(); //executando o clean para sempre começar com nenhuma

  getNotes().forEach((note) => {
    const noteElement = createNote(note.id, note.content, note.fixed);
    notesContainer.appendChild(noteElement);
  });
}

function cleanNotes() {
  notesContainer.replaceChildren([]);
}

function addNote() {
  // salvando as notas na local storage
  const notes = getNotes();

  const noteObject = {
    id: generateId(),
    content: noteInput.value,
    fixed: false,
  };
  // console.log(noteObject);

  const noteElement = createNote(noteObject.id, noteObject.content);
  notesContainer.appendChild(noteElement);

  notes.push(noteObject);

  saveNotes(notes);
  noteInput.value = "";
}

// evitar repetição do Id
// esse id é para fazer uma numeração de cópdigo para planilhas
function generateId() {
  return Math.floor(Math.random() * 5000);
}

// funçao de criar a nota
function createNote(id, content, fixed) {
  const element = document.createElement("div");
  element.classList.add("note");

  // quando a nota está vazia
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.placeholder = "Adicione algum texto...";
  element.appendChild(textarea);

  //icone de fixar
  const pinIcon = document.createElement("i");
  pinIcon.classList.add(...["bi", "bi-pin"]);
  element.appendChild(pinIcon);

  //icone de deletar
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add(...["bi", "bi-x-lg"]);
  element.appendChild(deleteIcon);

  //icone de duplicar
  const duplicateIcon = document.createElement("i");
  duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);
  element.appendChild(duplicateIcon);

  if (fixed) {
    element.classList.add("fixed");
  }

  /* ------------------------ Eventos do elemento ------------------------ */
  element.querySelector("textarea").addEventListener("keyup", (e) => {
    const noteContent = e.target.value;
    updateNote(id, noteContent);
  });

  //fixar
  element.querySelector(".bi-pin").addEventListener("click", () => {
    toggleFixNote(id);
  });

  // deletar
  element.querySelector(".bi-x-lg").addEventListener("click", () => {
    deleteNote(id, element);
  });

  //duplicar ou copiar
  element
    .querySelector(".bi-file-earmark-plus")
    .addEventListener("click", () => {
      copyNote(id);
    });

  return element;
}
/* ---------------------------------------------------------------------- */
function toggleFixNote(id) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id === id)[0];

  targetNote.fixed = !targetNote.fixed;

  saveNotes(notes);

  showNotes(); //colocando as notas que estao na Local Storage
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNotes(notes);
  notesContainer.removeChild(element);
}

function copyNote(id) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id === id)[0];
  const noteObject = {
    id: generateId(),
    content: targetNote.content,
    fixed: false,
  };
  //criando mesmo objeto com id diferente e coloca na DOM
  const noteElement = createNote(
    noteObject.id,
    noteObject.content,
    noteObject.fixed
  );
  //salvando na local storage
  notesContainer.appendChild(noteElement);
  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id === id)[0];

  targetNote.content = newContent;

  saveNotes(notes);
}

/* ----------------------------- Local Storage ----------------------------- */
function getNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

  return orderedNotes;
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function searchNotes(search) {
  const searchResults = getNotes().filter(
    (note) => note.content.includes(search) //se string inclui outra string
  );

  // console.log(searchResults);

  if (search !== "") {
    cleanNotes();

    searchResults.forEach((note) => {
      const noteElement = createNote(note.id, note.content);
      notesContainer.appendChild(noteElement);
    });
    return;
  }
  cleanNotes(); //para limpar a busca
  showNotes(); //para retornar as notas apos limpar a busca
}

function exportData() {
  const notes = getNotes();

  // CSV: separar o dado por virgula e quebrar linha pelo caractere \n
  const csvString = [
    ["ID", "Conteúdo", "Fixado?"],
    ...notes.map((note) => [note.id, note.content, note.fixed]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  //elemento descartável
  const element = document.createElement("a");
  element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
  element.target = "_blank";
  element.download = "notes.csv";
  element.click();

  console.log(csvString);
}
/* -------------------------------- Eventos -------------------------------- */
addNoteBtn.addEventListener("click", () => addNote());
searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;
  searchNotes(search);
});

// criar tarefa ao dar enter
noteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNote();
  }
});
// click do botao de exportar csv
exportBtn.addEventListener("click", () => {
  exportData();
});
/* ----------------------------- Inicialização ----------------------------- */
showNotes();
