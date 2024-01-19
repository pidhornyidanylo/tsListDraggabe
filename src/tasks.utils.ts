import {  Task } from "./App";


export const deleteTask = (id: string, tasks: Task[]) => {
    return tasks.filter(task => task.id !== id)
}

export const changeTask = (id: string, tasks: Task[], newValue: string) => {
    if(newValue.length > 0) {
        return tasks.map(task => {
            if(task.id === id) {
                task.value = newValue
            }
            return task
        })
    } else {
        return tasks
    }
}

