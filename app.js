
// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
require('dotenv').config();

const myUserName = process.env.USER_NAME;
const myAccess = process.env.DATABASE_ACCESS;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs'); // Set view engine to 'ejs' templating

mongoose.connect(`mongodb+srv://${myUserName}:${myAccess}@cluster0-sda6m.mongodb.net/todolistDB`, { useNewUrlParser: true,
useUnifiedTopology: true, useFindAndModify: false });

const toDoSchema = {
  name: String,
};

const Item = mongoose.model('Item', toDoSchema);

const item1  = new Item ({
  name: "Welcome to your todolist!"
});

const item2 = new Item ({
  name: "Hit the + button to add a new item."
});

const item3 = new Item ({
  name: "<-- Hit this to delete and item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [toDoSchema]
};

const List = mongoose.model("List", listSchema);


// Get current content of todoList from DB
app.get('/', (req, res) => {
  Item.find({}, (err, results) => {
    if (results.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted items.")
        }
      });
      res.redirect('/');
    } else {
      // Render formatted day and tasks in list.ejs template
      res.render(`list`, {
        listTitle: 'Today',
        newListItems: results
      });
    }
  });
});


// Get new task entry from form
app.post('/', (req, res) => {

  // User entered task from form
  const itemName = req.body.toDoItem;

  //Custom List title
  const listName = req.body.list;

  const newTask = new Item ({
    name: itemName
  });

  // Verify newTask from default list or custom
  if (listName === "Today") {
    newTask.save();
    res.redirect('/');
  } else {
    List.findOne({name: listName}, (err, foundList) => {
      foundList.items.push(newTask);
      foundList.save();
      res.redirect('/' + listName);
    })
  }
});

// Delete items on todoList
app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.redirect('/');
  } else {
    // Find Custom list and pull from items array
    List.findOneAndUpdate({name: listName}, {$pull:{items: {_id: checkedItemId}}}, (err, foundList) => {
      if (!err) {
        res.redirect('/' + listName);
      }
    });
  }
  });



// Cutomized List
app.get('/:customListName', (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, (err, foundList) => {
    if (!err) {
      // Create a new list
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // Show existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
      }
    }
  });
});


let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log(`Server has started successfully`);
});
