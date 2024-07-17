class Todo{
    constructor(title, description, dueDate, priority, category){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
        this.completed = false;
    }
}

export default Todo;