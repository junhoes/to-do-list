import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private localStorageKey = 'taskList';

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getTasks(): string[] {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
    }
    return [];
  }

  addTask(task: string) {
    if (this.isLocalStorageAvailable()) {
      if (task.length > 0){
        console.log('estoy');
        const tasks = this.getTasks();
        tasks.push(task);
        localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
      }
    }
  }

  deleteTask(index: number){
    if (this.isLocalStorageAvailable()) {
      const tasks = this.getTasks();
      tasks.splice(index, 1); // Eliminamos del array 1 elemento desde el index
      localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    }
  }
}
