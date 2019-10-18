// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); // Set view engine to 'ejs' templating

// List of toDo items
let tasks = ['Go to grocery store', 'Cook dinner', 'Help Xa with HW'];

app.get('/', (req, res) => {

  // Creates an instance of Date object
  let today = new Date();

  // Date formatting style
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  // Return the Date obj as a string with specified options
  let day = today.toLocaleDateString('en-US', options);

  // Render formatted day in list.ejs template
  res.render(`list`, {
    kindofDay: day,
    newListItems: tasks
  });

});

app.post('/', (req, res) => {
  let task = req.body.toDoItem;
  tasks.push(task);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
