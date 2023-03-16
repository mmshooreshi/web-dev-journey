
// function to get tasks from local storage
function getTasksFromLocalStorage() {
	let tasks = [];

	if (localStorage.getItem("tasks")) {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	return tasks;
}

// function to save tasks to local storage
function saveTasksToLocalStorage() {
	localStorage.setItem("tasks", JSON.stringify(taskList));
}

// initialize task list from local storage
let taskList = getTasksFromLocalStorage();

console.log(taskList.length)
if(taskList.length==0){
    console.log("yes")
    taskList==  [{"id":1678954593323,"text":"section Learn HTML","completed":false,"important":false},{"id":1678954593324,"text":"-- Learn HTML Basics","completed":false,"important":false},{"id":1678954593325,"text":"-- Learn HTML Semantics","completed":false,"important":false},{"id":1678954605430,"text":"-- Learn HTML Forms and Inputs","completed":false,"important":false},{"id":1678954609381,"text":"section Learn CSS","completed":false,"important":false},{"id":1678954618013,"text":"-- Learn CSS Basics","completed":false,"important":false},{"id":1678954624062,"text":"-- Learn CSS Layout","completed":false,"important":false},{"id":1678954631075,"text":"-- Learn CSS Advanced Topics","completed":false,"important":false},{"id":1678954637516,"text":"section Learn JS","completed":false,"important":false},{"id":1678954643386,"text":"-- Learn JS Basics","completed":false,"important":false},{"id":1678954649086,"text":"-- Learn JS Advanced Topics","completed":false,"important":false},{"id":1678954655152,"text":"-- Learn JS Libraries","completed":false,"important":false},{"id":1678954660513,"text":"section Use Vercel to Deploy Our First Web","completed":false,"important":false},{"id":1678954665438,"text":"-- Set Up Vercel And Connect To A Repository","completed":false,"important":false},{"id":1678954672501,"text":"-- Create A Web App With HTML, CSS, And JS","completed":false,"important":false},{"id":1678954675746,"text":"-- Deploy The Web App","completed":false,"important":false}]
    saveTasksToLocalStorage();
}

// function to add a task to the task list
function addTask() {
	// create task object from input value
	const taskInput = document.querySelector("#task-input");
	const task = {
		id: Date.now(),
		text: taskInput.value,
		completed: false,
		important: false
	};

	// add task to task list array
	taskList.push(task);

	// save task list to local storage
	saveTasksToLocalStorage();

	// clear input value
	taskInput.value = "";

	// render task list
	renderTaskList();
}

// function to delete a task from the task list
function deleteTask(taskId) {
	// find index of task with given id in task list array
	const taskIndex = taskList.findIndex(function(task) {
		return task.id === taskId;
	});

	// remove task from task list array
	taskList.splice(taskIndex, 1);

	// save task list to local storage
	saveTasksToLocalStorage();

	// render task list
	renderTaskList();
}

// function to toggle completed status of a task
function toggleCompleted(taskId) {
	// find task with given id in task list array
	const task = taskList.find(function(task) {
		return task.id === taskId;
	});

	// toggle completed status of task
	task.completed = !task.completed;

	// save task list to local storage
	saveTasksToLocalStorage();

	// render task list
	renderTaskList();
}

// function to toggle important status of a task
function toggleImportant(taskId) {
	// find task with given id in task list array
	const task = taskList.find(function(task) {
		return task.id === taskId;
	});

	// toggle important status of task
	task.important = !task.important;

	// save task list to local storage
	saveTasksToLocalStorage();

	// render task list
	renderTaskList();
}

// event listener for add task button
// document.querySelector("#addTaskButton").addEventListener("click", function(event) {
// 	event.preventDefault();
// 	addTask();
// });

// render initial task list
renderTaskList();


function renderTaskList() {
    const taskListElement = document.querySelector("#task-list ul");
  
    // clear current task list items
    taskListElement.innerHTML = "";
  
    // render new task list items
    taskList.forEach(function(task) {
      const taskItemElement = document.createElement("li");
      taskItemElement.setAttribute("data-task-id", task.id);
  
      const taskCheckboxElement = document.createElement("input");
      taskCheckboxElement.type = "checkbox";
      taskCheckboxElement.checked = task.completed;
      taskCheckboxElement.addEventListener("click", function() {
        toggleCompleted(task.id);
      });
      taskItemElement.appendChild(taskCheckboxElement);
  
      const taskTextElement = document.createElement("span");
      taskTextElement.textContent = task.text;
      if (task.important) {
        taskTextElement.classList.add("important");
      }
      taskTextElement.addEventListener("click", function() {
        toggleImportant(task.id);
      });
      taskItemElement.appendChild(taskTextElement);
  
      const taskDeleteElement = document.createElement("button");
      taskDeleteElement.textContent = "Delete";
      taskDeleteElement.addEventListener("click", function() {
        deleteTask(task.id);
      });
      taskItemElement.appendChild(taskDeleteElement);
  
      taskListElement.appendChild(taskItemElement);
    });
  }
  