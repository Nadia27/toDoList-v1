
// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs'); // Set view engine to 'ejs' templating

// List of toDo items
const tasks = ['Go to grocery store', 'Cook dinner', 'Help Xa with HW'];
const workItems = [];

app.get('/', (req, res) => {
  const day = date.getDate();

  // Render formatted day and tasks in list.ejs template
  res.render(`list`, {
    listTitle: day,
    newListItems: tasks
  });

});

app.post('/', (req, res) => {
  const task = req.body.toDoItem;

  if (req.body.list === 'Work') {
    workItems.push(task);
    res.redirect('/work');
  } else {
    tasks.push(task);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render(`list`, {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post('/work', (req, res) => {
  let item = req.body.toDoItem;
  workItems.push(item);
  res.redirect('/work');
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
