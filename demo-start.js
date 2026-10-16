// =============================================================
// Day 3 Demo: Build a To-Do List with vanilla JavaScript
// Pattern: STATE  →  RENDER  →  EVENTS update state  →  RENDER again
// Live-code in this order. Follow DEMO-GUIDE.md. Reference: demo-finished.js
// =============================================================

// STEP 1: Select elements
const formElem = document.getElementById("todo-form");
const todoInputElem = document.getElementById("todo-input");
const ulElem = document.getElementById("todo-list");
const clearCompleteBtn = document.querySelector("#clear-completed");




// STEP 2: State. One array of task objects: { id, text, completed }
function loadTodoApp() {
    const storeTodos = JSON.parse(localStorage.getItem("tasks"))  || [];
    return storeTodos;
}

function saveTodosToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(todoItems));
    // function to render Todo App
    renderTodoApp();
}

let todoItems = loadTodoApp(); // load from storage or start with an empty array


// STEP 3: render(): clear the list, build one <li> per task, append
function createTodoTask(todo) {
    const liTaskElem = document.createElement("li"); //create a new <li> element
    liTaskElem.className = "todo-item"; // set class name to "todo-item"


    //creating the text content for the li
    const liTextElem = document.createElement("span"); // create a span element for the task text
    liTextElem.className = "todo-text"; // set class name to "todo-text"
    liTextElem.textContent = todo.text; // set li text to task text

    // creating the delete button for the li
    const deleteBtnElem = document.createElement("button"); // create a delete butten
    deleteBtnElem.className = "delete";
    deleteBtnElem.type = "submit";
    deleteBtnElem.textContent = "X";
    deleteBtnElem.addEventListener("click", (event) => deleteTodoTask(todo.id, event)); // attaching an event listener to the delete button

    // create a checkbox for the li (todo item) to toggle the completed state of task
    const checkboxElem = document.createElement("input"); // create a checkbox input
    checkboxElem.type = "checkbox"; // set input type to checkbox
    checkboxElem.className = "toggle"; // set the class name to "toggle"
    checkboxElem.checked = todo.completed; //set checkbox state based on the task completed 
    checkboxElem.addEventListener("click", () => toggleTodoTaskCompletion(todo.id));


    // appending
    liTaskElem.append(liTextElem);  // appending the text to the li
    liTaskElem.append(checkboxElem);
    liTaskElem.append(deleteBtnElem);  // appending button to li
    ulElem.appendChild(liTaskElem); // appending the li to the ul

    return liTaskElem;
}

function renderTodoApp() {
    ulElem.textContent = "";

    //iterating over all the stored todo items inside the todoItems Array
    todoItems.forEach((todo) => {
        createTodoTask(todo); // calling the createTodoItem function
    })
}
// STEP 4: Add a task (form "submit" + validation)
// create the event listener (function) for the form submission
function handleFormSubmit(event) {
    event.preventDefault(); // prevent the default from submission behaviour and refreshing the page

    // grab the value from the input box
    const textInput = todoInputElem.value.trim();
    if (textInput === ""){
        //throw an error notification
        alert("please type a task first");
        return;
    }

    // create a unique todo/task list object
    const newTaskItem = {
        id: Date.now(),
        text: textInput,
        completed: false
    }

    todoItems.push(newTaskItem); // add the list item (task) to the array of todos
    saveTodosToLocalStorage();
    todoInputElem.value = "";
}

formElem.addEventListener("submit", handleFormSubmit);

function deleteTodoTask(id, event) {
    event.stopPropagation(); // prevent triggering other events on the same element when clicking delete
    todoItems = todoItems.filter((todo) => todo.id !== id);
    saveTodosToLocalStorage();
}


// function to toggle todo task completion
function toggleTodoTaskCompletion(id) {
    todoItems = todoItems.map((todo) => {
        if (todo.id === id) {
            return {...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodosToLocalStorage();
}

// STEP 5: Toggle + delete with ONE listener on the list (delegation)


// STEP 6: Filters (All / Active / Completed)


// STEP 7: Footer: items left + clear completed


// STEP 8: Save to localStorage and load on start

