
// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs'); // Set view engine to 'ejs' templating

mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true,
useUnifiedTopology: true });

const toDoSchema = {
  name: String,
};

const Item = mongoose.model('Item', toDoSchema);

const item1  = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete and item."
});

const defaultItems = [item1, item2, item3];

// Item.deleteOne({_id : "5df12a411f36194b8cc9041b"},(err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted record");
//   }
// });


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

app.post('/', (req, res) => {
  const itemName = req.body.toDoItem;


});

app.get('/work', (req, res) => {
  res.render(`list`, {
    listTitle: "Work List",
    newListItems: workItems
  });
});

// app.post('/work', (req, res) => {
//   let item = req.body.toDoItem;
//   workItems.push(item);
//   res.redirect('/work');
// });

app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
