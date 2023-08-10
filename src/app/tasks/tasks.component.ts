import { ModalService } from 'src/app/services/modal.service';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../_service/task.service';
import ITask from '../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  @Output() taskCreated = new EventEmitter<void>(); // Declare the event emitter
  task: ITask[] = [];
  constructor(
    protected modalService: ModalService,
    public taskService: TaskService
  ) {}

  inSubmission = false;
  taskCreds = {
    title: '',
    priority: '',
    description: '',
    details: '',
    duration: '',
    company: '',
    status: '',
  };

  ngOnInit() {
    this.refreshTasks(); // Initial fetch of tasks
  }

  async submit() {
    await this.taskService.createTask(this.taskCreds);
    // Optionally reset the form or do other tasks after successful submission
    this.taskCreds = {
      title: '',
      priority: '',
      description: '',
      details: '',
      duration: '',
      company: '',
      status: '',
    };
    await this.refreshTasks();
  }

  onTaskEdited() {
    // Refresh tasks after editing
    this.refreshTasks();
  }

  async refreshTasks() {
    this.task = await this.taskService.getTasks();
    console.log(this.task.length, 'Refresh task');
  }
}
