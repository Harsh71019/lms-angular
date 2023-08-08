import { ModalService } from 'src/app/services/modal.service';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  inSubmission = false;
  title = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  description = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  details = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  company = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  status = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  priority = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  duration = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  taskForm = new FormGroup({
    title: this.title, //
    description: this.description, //
    details: this.details, //
    company: this.company, //
    status: this.status, //
    priority: this.priority, //
    duration: this.duration, //
  });

  submit() {
    console.log(this.taskForm.value);
    // this.auth.register(this.taskForm.value);
  }
  constructor(protected modalService: ModalService) {}
}
