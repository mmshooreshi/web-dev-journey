
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

// function to add a task to the task list
function addTask() {
	// create task object from input value
	const taskInput = document.querySelector("#taskInput");
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
