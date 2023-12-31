import {
  saveTask,
  getTasks,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask,
} from "./firebase.js";

const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-container");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  onGetTasks((querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      html += `<div class="card card-body mb-3">
      <h3 class="h5">${task.title}</h3>
      <p>${task.description}</p>
      <div class="btn-group">
        <button class="btn btn-warning btn-sm btn-edit" data-id="${doc.id}">Edit</button>
        <button class="btn btn-primary btn-sm btn-delete btn btn-outline-danger" data-id="${doc.id}">Delete</button>
      </div>
    </div>`;
    });
    taskContainer.innerHTML = html;
    const btnsDelete = taskContainer.querySelectorAll(".btn-delete");

    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        // Mostrar el modal de confirmación para eliminar la tarea
        if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
          deleteTask(dataset.id);
        }
      });
    });

    const btnsEdit = taskContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        // Mostrar el modal de confirmación para editar la tarea
        if (confirm("¿Seguro que quieres editar esta tarea?")) {
        const doc = await getTask(dataset.id);
        const task = doc.data();
        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;

        editStatus = true;
        id = doc.id;

          taskForm["btn-task-save"].innerText = "Update";
        }
      });
    });
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  if (!editStatus) {
    saveTask(title.value, description.value);
  } else {
    updateTask(id, { title: title.value, description: description.value });

    editStatus = false;
  }

  taskForm.reset();
});

// NOTA
//DOMContentLoaded es un evento que se ejecuta cuando SE CARGA LA PAGINA
