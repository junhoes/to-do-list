import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';
import { log } from 'node:console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'To do list';
  taskList: string[] = [];
  newTask: string = '';

  weekDays: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  date: Date = new Date();  

  private _tareasService = inject(TareasService); // inyección del servicio tareas
  
  ngOnInit(): void {
    this.taskList = this._tareasService.getTasks(); // importamos las tareas almacenadas en localStorage
  }

  addTask(){
    this._tareasService.addTask(this.newTask);
    this.newTask = '';  // se vacía newTask para la siguiente tarea que se añada
    this.taskList = this._tareasService.getTasks(); // actualizamos la lista de tareas
  }

  deleteTask(index: number){
    this._tareasService.deleteTask(index);
    this.taskList = this._tareasService.getTasks(); // actualizamos la lista de tareas
  }

  // DATE METHODS
  getWeekDay():string {
    let day = this.date.getDay();
    return this.weekDays[day];
  }

  getSimpleDate():string {
    const day = this.date.getDate().toString().padStart(2, '0');
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = this.date.getFullYear().toString().slice(-2); 
  
    return `${day}/${month}/${year}`;
  }
  
}
