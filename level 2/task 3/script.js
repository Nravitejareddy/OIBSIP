function addTask() {
  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const error = document.getElementById("error");
  const taskList = document.getElementById("taskList");

  if (titleInput.value.trim() === "") {
    error.style.display = "block";
    return;
  } else {
    error.style.display = "none";
  }

  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  const taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = titleInput.value;

  const taskDesc = document.createElement("div");
  taskDesc.className = "task-desc";
  taskDesc.textContent = descInput.value;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => taskItem.remove();

  taskItem.appendChild(taskTitle);
  taskItem.appendChild(taskDesc);
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem);

  titleInput.value = "";
  descInput.value = "";
}
