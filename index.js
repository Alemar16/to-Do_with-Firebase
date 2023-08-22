import { saveTask, getTasks, onGetTasks } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-container");

window.addEventListener("DOMContentLoaded", async () => {
  onGetTasks((querySnapshot) => {
    let html = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      html += `<div>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
    </div>`;
    });
    taskContainer.innerHTML = html;
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  saveTask(title.value, description.value);
  taskForm.reset();
});

// NOTA
//DOMContentLoaded es un evento que se ejecuta cuando SE CARGA LA PAGINA
