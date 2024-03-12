
let todoDataSet=[];
let totalCount=0;
let totalCompleted=0;

// all the getElementById
let addTodoBtn = document.getElementById('addTodoButton');
let newTodoInputField = document.getElementById('newTodo');
let todoList = document.getElementById('todos');
let counter = 0;
let inputText=document.getElementById('newTodo');
inputText.addEventListener('input',function (event){
    let oldInput=event.target.value;
    event.target.value=oldInput.substring(0, 1).toUpperCase() + oldInput.substring(1);
})

// event Listener
addTodoBtn.addEventListener('click', addTodoAndUpdateCounter);
newTodoInputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') addTodoAndUpdateCounter();
})

// event Handler
function addTodoAndUpdateCounter(){
    addTodo();
    console.log(counter);
    counter++;
    console.log(counter);
}
function addTodo() {
    const newTodoDiv = document.createElement('div');
    newTodoDiv.classList.add('newTodoItem');
    newTodoDiv.id = "todo" + counter.toString();

    const taskLabel = document.createElement('label');
    taskLabel.textContent = newTodoInputField.value;
    taskLabel.id = "taskLabel" + counter.toString();

    const checkBox = document.createElement('input');
    checkBox.type = 'checkBox';
    checkBox.id = "checkBox" + counter.toString();
    checkBox.classList.add('checkBox');
    checkBox.addEventListener('click', () => completeTodo(parseInt(newTodoDiv.id.substring(4))));

    const iconSpan = document.createElement('button');
    iconSpan.innerHTML = 'X';
    iconSpan.id = "X" + counter.toString();
    iconSpan.addEventListener('click', () =>removeThatTodo(parseInt(newTodoDiv.id.substring(4))));
    newTodoDiv.append(checkBox, taskLabel, iconSpan);
    todoList.appendChild(newTodoDiv);
    const obj={
        id:counter,
        data:newTodoInputField.value,
        done:false,
    }
    todoDataSet.push(obj);
    totalCount++;
    todoCountManager();
    newTodoInputField.value = '';
    newTodoInputField.blur();
}


function completeTodo(id) {
    const completedTodo = document.getElementById(`todo`+id);
    const obj=todoDataSet.filter((todo)=>todo.id===(id))[0];
    console.log(obj)
    if(obj.done===false){
        completedTodo.classList.add('completed');
        obj.done=true;
        totalCompleted++;
        todoCountManager();
    }
    else{
        completedTodo.classList.remove('completed');
        obj.done=false;
        totalCompleted--;
        todoCountManager();
    }
}

function removeThatTodo(id){
    const todoToBeRemoved = document.getElementById(`todo${id}`);
    const obj = todoDataSet.find((data) => data.id === id);
    if (obj.done === true) totalCompleted--;
    todoToBeRemoved.remove();
    todoDataSet = todoDataSet.filter((data) => data.id !== id);
    totalCount--;
    todoCountManager();
}

function todoCountManager(){
    displayNumberOfTodos();
    displayTodosCompleted();
    displayTodosRemaining();
}
function displayNumberOfTodos(){
const totalTodoCounter=document.getElementById('totalTodoCounter');
totalTodoCounter.textContent=totalCount.toString();
}
function displayTodosCompleted(){
    const todosCompleted=document.getElementById('completedTodoCounter');
    todosCompleted.textContent=totalCompleted.toString();
}
function displayTodosRemaining(){
    const todosRemaining=document.getElementById('leftTodoCounter');
    todosRemaining.textContent=(totalCount-totalCompleted).toString();
}
