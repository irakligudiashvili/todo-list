class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
        this.todos[0] = 'none';
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo(index){
        this.todos.splice(index,1);
    }
}

export default Project;