let todoForm = document.querySelector("#todo-form");
let todoInput = document.querySelector("#todo-input");
let todoListGroup = document.querySelector("#todo-list-group");
let todosCount = document.querySelector("#todo-count");

let todos = [];
let todoInitianalId = 0;

function TodoPrototype(text, id) {
    this.text = text;
    this.id = id;
}

function editTodo(todoText, todoId) {
    for(i = 0; i < todos.length; i++) {
        if(todos[i].id == todoId) {
            todos[i].text = todoText;            
        }
    }
    console.log(todos);
}

function removeTodo(todoId) {
    document.querySelector(`#todo-number-${todoId}`).remove();

    for(i = 0; i < todos.length; i++) {
        if(todos[i].id == todoId) {
            todos.splice(i, 1);
        }
    }
    todosCount.textContent = todos.length;
}

function todoCreateDOM(todoText, todoId) {
    let listItem = document.createElement('li');
    let deleteBtn = document.createElement('button');
    let todoEditInput = document.createElement('input');

    listItem.setAttribute('class', 'list-group-item d-flex align-item-center justify-content-between')
    listItem.setAttribute('id', `todo-number-${todoId}`);

    deleteBtn.setAttribute('class', 'btn btn-outline-danger');
    deleteBtn.textContent = 'Delete';

    todoEditInput.value = todoText;
    todoEditInput.setAttribute('class', 'todo-edit-input');
    todoEditInput.disabled = true;

    listItem.addEventListener('dblclick', function(){
        todoEditInput.disabled = false;
        todoEditInput.focus();
        todoEditInput.style.borderBottom = "1px solid blue"; 
    });

    listItem.addEventListener('blur', function(){
        if(todoEditInput.value.length > 0) {
            editTodo(todoEditInput.value, todoId);
            todoEditInput.disabled = true;
            todoEditInput.style.borderBottom = "1px solid transparent"; 
        }  else {
            todoEditInput.style.borderBottom = "1px solid red"; 
        } 
    });

    listItem.addEventListener('keypress', function(e){
        if(e.key ==="Enter" && todoEditInput.value.length > 0) {
            editTodo(todoEditInput.value, todoId);
            todoEditInput.disabled = true;
            todoEditInput.style.borderBottom = "1px solid transparent"; 
            todoEditInput.blur();
        }  else {
            todoEditInput.style.borderBottom = "1px solid red"; 
        }      
    });

    deleteBtn.addEventListener('click', function() {
        removeTodo(todoId);
    });

    listItem.appendChild(todoEditInput);
    listItem.appendChild(deleteBtn);
    todoListGroup.appendChild(listItem);
}

function todoCreate(todoText, todoId) {
    todoCreateDOM(todoText, todoId);
    todos.push(new TodoPrototype(todoText, todoId));

    todosCount.textContent = todos.length;

}


todoForm.addEventListener("submit", function(e) {
    e.preventDefault(); 

    if(todoInput.value.length > 0) {
        todoCreate(todoInput.value, todoInitianalId)
    }

    todoForm.reset();

    todoInitianalId++;
});