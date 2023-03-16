// Define global variables
const taskList = document.querySelector("#task-list");
const taskInput = document.querySelector("#task-input");
const taskForm = document.querySelector("#task-form");
const taskTemplate = document.querySelector("#task-template");
const sectionTemplate = document.querySelector("#section-template");
const parentTemplate = document.querySelector("#parent-template");
const tasks = {};

// Define functions
function addTask() {
  const taskName = taskInput.value.trim();
  if (taskName === "") {
    alert("Please enter a task name.");
    return;
  }

  const task = createTask(taskName);
  tasks[task.id] = task;

  taskInput.value = "";
  taskList.append(task.element);
}

function createTask(name) {
  const taskElement = taskTemplate.content.cloneNode(true).firstElementChild;
  const task = {
    id: Date.now().toString(),
    name: name,
    element: taskElement,
    children: {},
    parent: null,
    isCompleted: false,
  };

  const completeCheckbox = taskElement.querySelector(".task-checkbox");
  completeCheckbox.addEventListener("change", function () {
    task.isCompleted = completeCheckbox.checked;
    updateTaskStatus(task);
  });

  const deleteButton = taskElement.querySelector(".task-delete-button");
  deleteButton.addEventListener("click", function () {
    deleteTask(task);
  });

  const addSubtaskButton = taskElement.querySelector(
    ".task-add-subtask-button"
  );
  addSubtaskButton.addEventListener("click", function () {
    const subtaskName = prompt("Please enter a name for the subtask:");
    if (subtaskName !== null) {
      const subtask = createTask(subtaskName);
      task.children[subtask.id] = subtask;
      subtask.parent = task;
      taskElement.querySelector(".task-subtasks").append(subtask.element);
    }
  });

  updateTaskStatus(task);
  return task;
}

function deleteTask(task) {
  if (task.parent !== null) {
    delete task.parent.children[task.id];
  }
  delete tasks[task.id];
  task.element.remove();
}

function updateTaskStatus(task) {
  const completeCheckbox = task.element.querySelector(".task-checkbox");
  completeCheckbox.checked = task.isCompleted;
  task.element.classList.toggle("completed", task.isCompleted);

  if (task.parent !== null) {
    updateTaskStatus(task.parent);
  }
}

function createParent(name) {
  const parentElement =
    parentTemplate.content.cloneNode(true).firstElementChild;
  const parent = {
    id: Date.now().toString(),
    name: name,
    element: parentElement,
    children: {},
    parent: null,
    isCompleted: false,
  };

  const parentName = parentElement.querySelector(".parent-name");
  parentName.textContent = name;

  const addSectionForm = parentElement.querySelector(".add-section-form");
  addSectionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const sectionName = addSectionForm
      .querySelector(".add-section-input")
      .value.trim();
    if (sectionName === "") {
      alert("Please enter a section name.");
      return;
    }

    const section = createSection(sectionName);
    parent.children[section.id] = section;
    section.parent = parent;
    parentElement.querySelector(".section-list").append(section.element);
    addSectionForm.reset();
  });

  const deleteButton = parentElement.querySelector(".parent-delete-button");
  deleteButton.addEventListener("click", function () {
    deleteParent(parent);
  });

  const addSubtaskButton = taskElement.querySelector(
    ".task-add-subtask-button"
  );
  addSubtaskButton.addEventListener("click", function () {
    const subtaskName = prompt("Please enter a name for the subtask:");
    if (subtaskName !== null) {
      const subtask = createTask(subtaskName);
      task.children[subtask.id] = subtask;
      subtask.parent = task;
      taskElement.querySelector(".task-subtasks").append(subtask.element);
    }
  });

  updateTaskStatus(task);
  return task;
}

function deleteTask(task) {
  if (task.parent !== null) {
    delete task.parent.children[task.id];
  }
  delete tasks[task.id];
  task.element.remove();
}

function updateTaskStatus(task) {
  const completeCheckbox = task.element.querySelector(".task-checkbox");
  completeCheckbox.checked = task.isCompleted;
  task.element.classList.toggle("completed", task.isCompleted);

  if (task.parent !== null) {
    updateTaskStatus(task.parent);
  }
}

const sectionElement =
  sectionTemplate.content.cloneNode(true).firstElementChild;
const section = {
  id: Date.now().toString(),
  name: name,
  element: sectionElement,
  children: {},
  parent: null,
  isCompleted: false,
};

const sectionName = sectionElement.querySelector(".section-name");
sectionName.textContent = name;

const addTaskForm = sectionElement.querySelector(".add-task-form");
addTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskName = addTaskForm.querySelector(".add-task-input").value.trim();
  if (taskName === "") {
    alert("Please enter a task name.");
    return;
  }

  const task = createTask(taskName);
  section.children[task.id] = task;
  task.parent = section;
  sectionElement.querySelector(".task-list").append(task.element);
  addTaskForm.reset();
});

const deleteButton = sectionElement.querySelector(".section-delete-button");
deleteButton.addEventListener("click", function () {
  deleteSection(section);
});
const addSubsectionButton = sectionElement.querySelector(
  ".section-add-subsection-button"
);
addSubsectionButton.addEventListener("click", function () {
  addNewSubsection();
});

function addNewSubsection() {
  const subsectionName = prompt("Please enter a name for the subsection:");
  if (subsectionName !== null) {
    const subsection = createSection(subsectionName);
    section.children.push(subsection);
    subsection.parent = section;
    sectionElement.querySelector(".subsection-list").append(subsection.element);
  }
}

function createSection(name) {
  const id = generateUniqueId();
  const element = document.createElement("div");
  element.classList.add("subsection");
  element.innerHTML = `<h3>${name}</h3><ul class="subsection-list"></ul><button class="subsection-add-subsection-button">Add Subsection</button>`;
  const section = { id, element, parent: null, children: [] };
  const addSubsectionButton = element.querySelector(
    ".subsection-add-subsection-button"
  );
  addSubsectionButton.addEventListener("click", function () {
    addNewSubsection(section);
  });
  return section;
}

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function deleteSection(section) {
  if (section.parent !== null) {
    delete section.parent.children[section.id];
  }
  delete tasks[section.id];
  section.element.remove();
}

function createParent(name) {
  const parentElement =
    parentTemplate.content.cloneNode(true).firstElementChild;
  const parent = {
    id: Date.now().toString(),
    name: name,
    element: parentElement,
    children: {},
    parent: null,
    isCompleted: false,
  };

  const parentName = parentElement.querySelector(".parent-name");
  parentName.textContent = name;

  const addSectionForm = parentElement.querySelector(".add-section-form");
  addSectionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const sectionName = addSectionForm
      .querySelector(".add-section-input")
      .value.trim();
    if (sectionName === "") {
      alert("Please enter a section name.");
      return;
    }

    const section = createSection(sectionName);
    parent.children[section.id] = section;
    section.parent = parent;
    parentElement.querySelector(".section-list").append(section.element);
    addSectionForm.reset();
  });

  const deleteButton = parentElement.querySelector(".parent-delete-button");
  deleteButton.addEventListener("click", function () {
    deleteParent(parent);
  });

  const addSubparentButton = parentElement.querySelector(
    ".parent-add-subparent-button"
  );
  addSubparentButton.addEventListener("click", function () {
    const subparentName = prompt("Please enter a name for the subparent:");
    if (subparentName !== null) {
      const subparent = createParent(subparentName);
      parent.children[subparent.id] = subparent;
      subparent.parent = parent;
      parentElement
        .querySelector(".parent-subparents")
        .append(subparent.element);
    }
  });

  updateParentStatus(parent);
  return parent;
}

function deleteParent(parent) {
  if (parent.parent !== null) {
    delete parent.parent.children[parent.id];
  }
  delete tasks[parent.id];
  parent.element.remove();
}

function updateParentStatus(parent) {
  for (const childId in parent.children) {
    const child = parent.children[childId];
    if (!child.isCompleted) {
      parent.isCompleted = false;
      parent.element.classList.remove("completed");
      return;
    }
  }
  parent.isCompleted = true;
  parent.element.classList.add("completed");

  if (parent.parent !== null) {
    updateParentStatus(parent.parent);
  }
}

// Initialize the app
const parentList = document.querySelector("#parent-list");

for (const task of initialTasks) {
  if (task.parent === null) {
    const parent = createParent(task.name);
    tasks[parent.id] = parent;
    parentList.append(parent.element);

    for (const childTask of task.children) {
      const section = createSection(childTask.name);
      parent.children[section.id] = section;
      section.parent = parent;
      parent.element.querySelector(".section-list").append(section.element);

      for (const subchildTask of childTask.children) {
        const task = createTask(subchildTask);
        section.children[task.id] = task;
        task.parent = section;
        section.element.querySelector(".task-list").append(task.element);
      }
    }
  }
}
