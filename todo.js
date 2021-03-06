angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.saved = localStorage.getItem('todos');
    todoList.todos = (localStorage.getItem('todos')!==null) ?
    JSON.parse(todoList.saved) : [ {text: 'Learn AngularJS', done: true}, {text: 'Build an Angular app', done: true}, {text: 'Update Website', done: false} ];
    localStorage.setItem('todos',JSON.stringify(todoList.todos));

    todoList.addTodo = function() {
    if (todoList.todoText){
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
      localStorage.setItem('todos',JSON.stringify(todoList.todos));
    }
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
      localStorage.setItem('todos',JSON.stringify(todoList.todos));
    };
  });
