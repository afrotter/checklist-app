import { v4 as uuidv4 } from 'uuid';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const data = browser ? JSON.parse(window.localStorage.getItem('st-todo-list')) ?? [] : [];

export const todos = writable(data);

//Subs to changes and changes value to a string

todos.subscribe((value) => {
    if (browser) {
        localStorage.setItem('st-todo-list', JSON.stringify());
    }
});

//To-do adding function
export const addTodo = () => {
    todos.update((currentTodos) =>{
        return [...currentTodos, { id: uuidv4(), text: '', complete: false }];
    });
};

//To-do removal function
export const deleteTodo = (id) => {
    todos.update((currentTodos) => {
        return currentTodos.filter((todo) => todo.id !== id);
    });
}

//To-do toggle function
export const toggleComplete = (id) => {
    todos.update((currentTodos) => {
        return currentTodos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, complete: !todo.complete};
            }
            return todo;
        })
    })
}

//To-do edit function
export const editTodo = (id,text) => {
    todos.update((currentTodos) => {
        return currentTodos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, text};
            }
            return todo;
        });
    });
};