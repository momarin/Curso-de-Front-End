/* -------------------------------------------------------------------- */
// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;
/* -------------------------------------------------------------------- */
// Funções
const saveTodo = (text, done = 0, save = 1) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  //title
  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  //buttons
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  todo.appendChild(deleteBtn);

  // utilizando dados da localstorage
  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({ text, done });
  }

  todoList.appendChild(todo);

  //limpando valor quando usuario termina de digitar
  todoInput.value = "";
  todoInput.focus();
};

//escondendo formulário "adicione" e abrindo form edit
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

// função update
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

// função search
const getSearchTodos = (search) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    const normalizedSearch = search.toLowerCase();

    //consertando problema de n voltarem as tarefas ao clicar botao limpar
    todo.style.display = "flex";

    if (!todoTitle.includes(normalizedSearch)) {
      todo.style.display = "none";
    }
  });
};

// função filtrar
const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;

    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    default:
      break;
  }
};

/* -------------------------------------------------------------------- */
// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

//evento de click
document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }
  //no botão de finalizar aplicando/removendo classe done
  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");

    updateTodoStatusLocalStorage(todoTitle);
  }
  // no botão remove
  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();

    removeTodoLocalStorage(todoTitle);
  }
  // no botão de editar
  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

//ativando botao cancel do edit
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

// botão search input
searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;
  //function que passa o search p ela e executa a busca
  getSearchTodos(search);
});

// ativando botão limpar
eraseBtn.addEventListener("click", (e) => {
  preventDefault();
  searchInput.value = "";

  //btn estava enviando formulario e resetando. evento elimina o problema
  searchInput.dispatchEvent(new Event("keyup"));
});

// ativando o filtro
filterBtn.addEventListener("change", (e) => {
  const filteValue = e.target.value;

  filterTodos(filteValue);
});

// Local Storage
// salvando to do
const getTodosLocalStorage = () => {
  // ao salvar um objeto na local storage, transformamo-lo para json
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};

// imprimindo na tela
const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  //todos os to dos da local storage
  const todos = getTodosLocalStorage();

  // add novo to do no array
  todos.push(todo);

  // salvar tudo na local storage
  localStorage.setItem("todos", JSON.stringify(todos));
};

// removendo tarefas do to do
const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text !== todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

// status da tarefa
const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();
  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

//editando tarefa
const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

// para conectar o save na local storage com o código, adiciono os parametros done e save na função saveTodo.

// executando função loadtodos
loadTodos();
