const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

function addTodo(e) {
  e.preventDefault();

  const todoText = todoInput.value.trim(); // Get trimmed input

  if (todoText === "") {
    alert("Todo cannot be empty!");
    return;
  }

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoText;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoText);

  todoInput.value = "";

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `✓`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const editButton = document.createElement("button");
  editButton.innerHTML = `✎`;
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `✗`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    todo.classList.add("fall");
    todo.classList.add("completed");
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  if (item.classList[0] === "edit-btn") {
    const todoDiv = item.parentElement;
    const todoItem = todoDiv.querySelector(".todo-item");

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todoItem.innerText;
    editInput.classList.add("edit-input");

    todoDiv.replaceChild(editInput, todoItem);
    editInput.focus();

    editInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        const newText = editInput.value.trim();
        if (newText === "") {
          alert("Todo cannot be empty!");
          editInput.focus();
          return;
        }
        updateLocalTodos(todoItem.innerText, newText);
        todoItem.innerText = newText;
        todoDiv.replaceChild(todoItem, editInput);
      }
    });

    editInput.addEventListener("blur", function() {
      // If user clicks outside, cancel edit
      todoDiv.replaceChild(todoItem, editInput);
    });
  }
}

function saveLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateLocalTodos(oldText, newText) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todos.indexOf(oldText);
  if (todoIndex !== -1) {
    todos[todoIndex] = newText;
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `✓`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const editButton = document.createElement("button");
    editButton.innerHTML = `✎`;
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `✗`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}
