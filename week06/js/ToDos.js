import { readFromLS, writeToLS } from "./ls.js";
import { qs, onTouch } from "./utilities.js";

let todoList = null;

export default class Todos {
    constructor() {
        this.todoListHtml = qs("#todo-list");
        this.todoKey = "todoList";
        this.sortBy = "all";
    }
    
    addTodo() {
        const input = qs("textarea");
        saveTodo(input.value, this.todoKey);
        this.listTodos();
        input.value = "";
        input.focus();
    }

    listTodos() {
        if(readFromLS(this.todoKey) !== null) {
            getTodos(this.todoKey);
            renderTodoList(todoList, this.todoListHtml, this);
        }
    }

    completeTodo(number) {
        if(todoList[number].completed){
            todoList[number].completed = false;
        } else {
            todoList[number].completed = true;
        }
        writeToLS(this.todoKey, todoList);
        this.listTodos();
    }

    removeTodo(number) {
        todoList.splice(number, 1);
        writeToLS(this.todoKey, todoList);
        this.listTodos();
    }

    filterTodos(sortType) {
        this.sortBy = sortType;
        this.listTodos();
    }
}

function saveTodo(task, key) {
    if(task.trim() != "") {
        const timestamp = new Date();
        if(todoList === null) {
            todoList = [];
        }
        todoList.push({
        id : timestamp.getTime(),
        content : task,
        completed : false
        });
        writeToLS(key, todoList);
    }
}

function getTodos(key) {
    if(todoList === null) {
        todoList = readFromLS(key);
        return todoList;
    }
}

function renderTodoList(list, element, parentClass) {
    element.innerHTML = "";
    let count = 0;
    let activeCount = 0;
    let completeCount = 0;
    list.forEach(task => {
        const elementNumber = count;
        count++;
        if(task.completed) {completeCount++;} else {activeCount++;}

        if(parentClass.sortBy === "all" ||
        (parentClass.sortBy === "complete" && task.completed) ||
        (parentClass.sortBy === "active" && task.completed === false)) {
            const listItem = document.createElement("li");
            const listDiv = document.createElement("div");
            const completeButton = document.createElement("div");
            const checkImage = document.createElement("img");
            const taskPara = document.createElement("p");
            const removeButton = document.createElement("button");
            if(task.completed){
                taskPara.classList.add("complete");
            } else {
                checkImage.classList.add("hidden");
            }

            onTouch(completeButton, () => {parentClass.completeTodo(elementNumber)});
            onTouch(removeButton, () => {parentClass.removeTodo(elementNumber)});

            taskPara.textContent = task.content;
            taskPara.classList.add("todo-item");
            removeButton.classList.add("remove-item");
            removeButton.textContent = "X";
            checkImage.setAttribute("src", "images/youvedonedit.jpg");

            completeButton.appendChild(checkImage);
            listDiv.appendChild(completeButton);
            listDiv.appendChild(taskPara);
            listItem.appendChild(listDiv);
            listItem.appendChild(removeButton);
            element.appendChild(listItem);
        }
    });
    if(parentClass.sortBy === "all" || parentClass.sortBy === "active") {
        document.getElementById("task-count").textContent = activeCount;
        document.getElementById("task-type").textContent = "left";
    } else {
        document.getElementById("task-count").textContent = completeCount;
        document.getElementById("task-type").textContent = "done";
    }
    if(((parentClass.sortBy === "all" || parentClass.sortBy === "active") && activeCount !== 1) ||
        (parentClass.sortBy === "complete" && completeCount !== 1)) {
            document.getElementById("task-plural").textContent = "tasks";
        } else {
            document.getElementById("task-plural").textContent = "task";
        }
}