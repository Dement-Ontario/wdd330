import Todos from "./ToDos.js";
import { onTouch, qs } from "./utilities.js";

const myTodo = new Todos();

myTodo.listTodos();

onTouch(qs("#add-item"), () => {myTodo.addTodo()});
onTouch(qs("#sort-all"), () => {myTodo.filterTodos("all")});
onTouch(qs("#sort-active"), () => {myTodo.filterTodos("active")});
onTouch(qs("#sort-complete"), () => {myTodo.filterTodos("complete")});