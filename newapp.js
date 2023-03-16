const express = require('express');
const fetch = import('node-fetch');
const btoa = import('btoa');
const app = express();


// read in environment variable for GitHub API token
const gitApiToken = process.env.GIT_API_TOKEN;

// configure express to use public directory for static files
app.use(express.static('public'));

// route to serve index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to get task list
app.get('/tasks', async function(req, res) {
  // get JSON file from GitHub
  const response = await fetch('https://api.github.com/repos/mmshooreshi/web-dev-journey/contents/tasks.json', {
    headers: {
      "Authorization": `token ${gitApiToken}`,
      "Accept": "application/vnd.github+json"
    }
  });
  const data = await response.json();

  // decode content from base64
  const content = Buffer.from(data.content, 'base64').toString();

  // parse JSON content into task list
  const taskList = JSON.parse(content);

  // send task list back to client
  res.send(taskList);
});

// API endpoint to add a task
app.post('/tasks', express.json(), async function(req, res) {
  // read task data from request body
  const newTask = req.body;

  // get current task list from GitHub
  const response = await fetch('https://api.github.com/repos/mmshooreshi/web-dev-journey/contents/tasks.json', {
    headers: {
      "Authorization": `token ${gitApiToken}`,
      "Accept": "application/vnd.github+json"
    }
  });
  const data = await response.json();

  // decode content from base64
  const content = Buffer.from(data.content, 'base64').toString();

  // parse JSON content into task list
  const taskList = JSON.parse(content);

  // add new task to task list
  taskList.push(newTask);

  // update JSON file with new task list
  const putResponse = await fetch('https://api.github.com/repos/<username>/<repository>/contents/tasks.json', {
    method: 'PUT',
    headers: {
      "Authorization": `token ${gitApiToken}`,
      "Content-Type": "application/json",
      "Accept": "application/vnd.github+json"
    },
    body: JSON.stringify({
      message: "add new task",
      content: btoa(JSON.stringify(taskList, null, 2)),
      sha: data.sha
    })
  });

  // send updated task list back to client
  res.send(taskList);
});

// API endpoint to update a task
app.put('/tasks/:id', express.json(), async function(req, res) {
  // read task id from request parameters
  const taskId = req.params.id;

  // read updated task data from request body
  const updatedTask = req.body;

  // get current task list from GitHub
  const response = await fetch('https://api.github.com/repos/<username>/<repository>/contents/tasks.json', {
    headers: {
      "Authorization": `token ${gitApiToken}`,
      "Accept": "application/vnd.github+json"
    }
  });
  const data = await response.json();

  // decode content from base64
  const content = Buffer.from(data.content, 'base64').toString();

  // parse JSON content into task list
  const taskList = JSON.parse(content);

  // find task with given id in task list
  const taskIndex = taskList.findIndex(function(task) {
    return task.id === taskId;
  });

  // update task with new data
  taskList[taskIndex] = updatedTask;

  // update JSON file with new task list
  const putResponse = await fetch('https://api.github.com/repos/<username>/<repository>/contents/tasks.json', {
    method: 'PUT',
    headers: {
      "Authorization": `token ${gitApiToken}`,
      "Content-Type": "application/json",
      "Accept": "application/vnd.github+json"
    },
    body: JSON.stringify({
      message: "update task",
      content: btoa(JSON.stringify(taskList, null, 2)),
      sha: data.sha
    })
  });

  // send updated task list back to client
  res.send(taskList);
});


// API endpoint to delete a task
app.delete('/tasks/:id', async function(req, res) {
  // read task id from request parameters
  const taskId = req.params.id;

  // get current task list from GitHub
  const response = await fetch('https://api.github.com/repos/<username>/<repository>/contents/tasks.json', {
    headers: {
      "Authorization": `token ${gitApiToken}`,
      "Accept": "application/vnd.github+json"
    }
  });
  const data = await response.json();

  // decode content from base64
  const content = Buffer.from(data.content, 'base64').toString();

  // parse JSON content into task list
  const taskList = JSON.parse(content);

  // remove task with given id from task list
  const taskIndex = taskList.findIndex(function(task) {
    return task.id === taskId;
  });
  taskList.splice(taskIndex, 1);

  // update JSON file with new task list
  const putResponse = await fetch('https://api.github.com/repos/<username>/<repository>/contents/tasks.json', {
    method: 'PUT',
    headers: {
      "Authorization": `token ${gitApiToken}`,
      "Content-Type": "application/json",
      "Accept": "application/vnd.github+json"
    },
    body: JSON.stringify({
      message: "delete task",
      content: btoa(JSON.stringify(taskList, null, 2)),
      sha: data.sha
    })
  });

  // send updated task list back to client
  res.send(taskList);
});


  // route to handle 404 errors
app.use(function(req, res, next) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});


// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
