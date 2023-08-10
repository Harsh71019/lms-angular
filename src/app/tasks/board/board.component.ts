import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/_service/task.service';
import ITask from 'src/app/models/task.model';
import { ModalService } from 'src/app/services/modal.service';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  @Input() tasks: ITask[] = [];
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

  constructor(
    public modalService: ModalService,
    public taskService: TaskService
  ) {}
  statuses: string[] = ['Todo', 'InProgress', 'QA', 'Done', 'Blocked'];
  @Output() taskEdited = new EventEmitter<void>(); // Declare the event emitter

  async editTask(id: string) {
    const taskPreFilled = await this.taskService.getTaskById(id);

    if (taskPreFilled) {
      //@ts-ignore
      const isoDate = new Date(taskPreFilled.duration);
      const month = (isoDate.getMonth() + 1).toString().padStart(2, '0');
      const day = isoDate.getDate().toString().padStart(2, '0');
      const year = isoDate.getFullYear();

      const formattedDate = `${year}-${month}-${day}`;
      this.taskCreds.title = taskPreFilled?.title!;
      this.taskCreds.priority = taskPreFilled?.priority!;
      this.taskCreds.description = taskPreFilled?.description!;
      this.taskCreds.details = taskPreFilled?.details!;
      this.taskCreds.company = taskPreFilled?.company!;
      this.taskCreds.status = taskPreFilled?.status!;
      //@ts-ignore
      this.taskCreds.duration = formattedDate;
      //@ts-ignore
    }
    this.modalService.open(id);
  }

  async submit(id: string) {
    await this.taskService.updateTaskById(id, this.taskCreds);
    this.taskEdited.emit();
    this.modalService.close();
  }

  getTasksByStatus(status: string): ITask[] {
    return this.tasks.filter((task) => task.status === status);
  }

  //@ts-ignore
  async drop(event, newStatus) {
    // console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const updatedTask = event.container.data[event.currentIndex];
    updatedTask.status = newStatus;

    await this.taskService.updateTaskStatus(
      updatedTask._id!,
      updatedTask.status
    );
  }
}
