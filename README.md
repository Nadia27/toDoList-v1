# To Do List

https://aqueous-reef-43439.herokuapp.com/

To-Do List application with the ability to create different lists i.e. Work List, Home List, etc.  Just add the name of the list you want to create to the end of the url.  For example, if would like to create a grocery list https://aqueous-reef-43439.herokuapp.com/grocery would create a to-do list with a title of grocery. This app uses MongoDB to persist data.  

## Built With

* Embedded JavaScript (EJS)
* Javascript
* Node JS & Express
* Mongoose
* MongoDB Atlas


## What I learned building the Sideline Story

*  What is EJS?
    * templating language/engine that generates HTML with plain JS

    * EJS is extremely helpful in generating dynamic content with real-time updates.

    * EJS has 4 frequently used tags:
      * **<% %>** : are used to for control flow i.e. bindings, control flow, conditional, no output

      ex:
        ```
        <% previousPost.forEach((post) => { %>
          <h2>
            <%= post.title %>
          </h2>
        <% }); %>        
        ```

      * **<%= %>** : outputs the value into the into the template

        ex:
        ```<%= post.content.substring(0, 100) + " ..." %>```

      * **<%- -%>** : outputs the unescaped value in the template

         ex.
        ```<%- include('partials/footer') -%>```


      * **<%# %>** : are used for comments

* MongoDB No Structured Query Language (NoSQL) and its differences to SQL database

  * Data represented as JSON objects.
  * Relationships. Relational and Non-relational
  * Scalability

* CRUD operations

* Overall more comfort with Javascript, Node, and Express. <br/>
