import './style.css';
import Todo from './todo';
import Project from './project';

const defaultProject = new Project('Default');
const projects = [defaultProject];

const projectListElement = document.querySelector('.category-list');
const todoContainerElement = document.querySelector('.todo-container');
const formElement = document.querySelector('.form');
const categoryFormElement = document.querySelector('.category-form');

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submitting')
    addTodo();
})

categoryFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    addProject();
})

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderTodos(defaultProject);
})

function addTodo(){
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;
    
    const todo = new Todo(title, description, dueDate, priority, category);
    const project = projects.find(proj => proj.name === category);
    project.addTodo(todo);
    console.log('attempting addTodo');

    renderTodos(project);
}

function addProject(){
    const categoryName = document.querySelector('#category').value;
    const project = new Project(categoryName);
    projects.push(project);
    renderProjects();
}

function renderProjects(){
    projectListElement.innerHMTL = '';
    projects.forEach((project) => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('category-list-subdiv');
        projectElement.innerHTML = `
            <p class="category-title">${project.name}</p>
            <button class="category-delete">Delete</button>
        `;
        projectElement.querySelector('.category-delete').addEventListener('click', () => {
            removeProject(project.name);
        });
        projectListElement.appendChild(projectElement);
    })
}

function renderTodos(project) {
    todoContainerElement.innerHTML = '';
    project.todos.forEach((todo, index) => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('task-container');
        todoElement.innerHTML = `
            <p class="todo-title">${todo.title}</p>
            <div class="todo-subdiv">
                <div class="priority-subdiv">
                    <p>Priority: </p>
                    <div class="todo-priority ${getPriorityColor(todo.priority)}"></div>
                </div>
                <div class="deadline-subdiv">
                    <p>Deadline: </p>
                    <p class="todo-deadline">${todo.dueDate}</p>
                </div>
                <div class="actions-subdiv">
                    <svg class="checkmark" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" /></svg>
                    <svg class="delete" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor" /><path d="M9 9H11V17H9V9Z" fill="currentColor" /><path d="M13 9H15V17H13V9Z" fill="currentColor" /></svg>
                </div>
            </div>
        `;
        todoElement.querySelector('.delete').addEventListener('click', () => {
            project.removeTodo(index);
            renderTodos(project);
        });
        todoContainerElement.appendChild(todoElement);
    });
}

function removeProject(name) {
    const index = projects.findIndex(project => project.name === name);
    if (index !== -1) {
        projects.splice(index, 1);
        renderProjects();
    }
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'high':
            return 'red';
        case 'regular':
            return 'orange';
        case 'low':
            return 'yellow';
        default:
            return '';
    }
}