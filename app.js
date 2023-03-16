// initialize task counter
let taskIdCounter = 0;

// initialize task list array
let taskList = [];

// get elements from HTML
const taskInput = document.querySelector("#taskInput");
const taskListElement = document.querySelector("#taskList");

// function to create a new task object
function createNewTask(taskName) {
	taskIdCounter++;
	return {
		id: taskIdCounter,
		name: taskName,
		completed: false,
		important: false
	};
}

// // function to add a task to the task list
// function addTask() {
// 	// get task name from input field
// 	const taskName = taskInput.value.trim();
	
// 	if (taskName !== "") {
// 		// create new task object
// 		const newTask = createNewTask(taskName);

// 		// add new task to task list
// 		taskList.push(newTask);

// 		// clear input field
// 		taskInput.value = "";

// 		// render task list
// 		renderTaskList();
// 	}
// }

function addTask() {
	// get task input value
	const taskInput = document.querySelector("#taskInput");
	const taskText = taskInput.value.trim();

	// return if task input is empty
	if (taskText === "") {
		return;
	}

	// create new task object
	const newTask = {
		id: Date.now(),
		text: taskText,
		completed: false,
		important: false
	};

	// add new task to task list
	taskList.push(newTask);

	// store updated task list in tasks.json using GitHub API
	fetch("https://api.github.com/repos/mmshooreshi/web-dev-journey/tasks.json", {
		method: "PUT",
		headers: {
            "Authorization": `token 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`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			message: "Add new task",
			content: btoa(JSON.stringify(taskList)),
			sha: "<SHA of tasks.json>"
		})
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error));

	// clear task input
	taskInput.value = "";

	// render task list
	renderTaskList();
}


// // function to render the task list
// function renderTaskList() {
// 	// clear task list element
// 	taskListElement.innerHTML = "";

// 	// loop through task list array and create HTML elements for each task
// 	taskList.forEach(function(task) {
// 		const listItemElement = document.createElement("li");
// 		listItemElement.classList.add("collection-item");

// 		// create task name element
// 		const taskNameElement = document.createElement("span");
// 		taskNameElement.classList.add("task");
// 		taskNameElement.textContent = task.name;

// 		// create delete button element
// 		const deleteButtonElement = document.createElement("button");
// 		deleteButtonElement.classList.add("btn", "btn-delete");
// 		deleteButtonElement.innerHTML = '<i class="material-icons">delete</i>';
// 		deleteButtonElement.addEventListener("click", function() {
// 			deleteTask(task.id);
// 		});

// 		// create important button element
// 		const importantButtonElement = document.createElement("button");
// 		importantButtonElement.classList.add("btn", "btn-important");
// 		importantButtonElement.innerHTML = '<i class="material-icons">warning</i>';
// 		importantButtonElement.addEventListener("click", function() {
// 			toggleImportant(task.id);
// 		});

// 		// create completed button element
// 		const completedButtonElement = document.createElement("button");
// 		completedButtonElement.classList.add("btn", "btn-completed");
// 		completedButtonElement.innerHTML = '<i class="material-icons">done</i>';
// 		completedButtonElement.addEventListener("click", function() {
// 			toggleCompleted(task.id);
// 		});

// 		// add task name element and buttons to list item element
// 		listItemElement.appendChild(taskNameElement);
// 		listItemElement.appendChild(deleteButtonElement);
// 		listItemElement.appendChild(importantButtonElement);
// 		listItemElement.appendChild(completedButtonElement);

// 		// add completed class to list item element if task is completed
// 		if (task.completed) {
// 			listItemElement.classList.add("completed");
// 		}

// 		// add important class to list item element if task is important
// 		if (task.important) {
// 			listItemElement.classList.add("important");
// 		}

// 		// add list item element to task list element
// 		taskListElement.appendChild(listItemElement);
// 	});
// }

function renderTaskList() {
	// fetch task list from tasks.json using GitHub API
	fetch("https://api.github.com/repos/mmshooreshi/web-dev-journey/tasks.json", {
		method: "GET",
		headers: {
            "Content-Type": "application/json",
            "Authorization": `token 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`
		}
	})
	.then(response => response.json())
	.then(data => {
		// decode task list data from base64 encoding
		const taskListData = JSON.parse(atob(data.content));

		// update taskList array with fetched data
		taskList = taskListData;

		// render task list items
		const taskListElement = document.querySelector("#taskList");
		taskListElement.innerHTML = "";
		taskList.forEach(function(task) {
			const taskItemElement = createTaskItemElement(task);
			taskListElement.appendChild(taskItemElement);
		});
	})
	.catch(error => console.error(error));
}

// function to delete a task from the task list
function deleteTask(taskId) {
	// find index of task with given id in task list array
	const taskIndex = taskList.findIndex(function(task) {
		return task.id === taskId;
	});

	// remove task from task list array
	taskList.splice(taskIndex, 1);

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

// render task list
renderTaskList();

}

// event listener for add task button
// document.querySelector("#addTaskButton").addEventListener("click", function(event) {
// event.preventDefault();
// addTask();
// });

// render initial task list
renderTaskList();






