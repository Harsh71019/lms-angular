import { Injectable } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, delay, catchError } from 'rxjs/operators';
import ITask from '../models/task.model';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    public modal: ModalService,
    private http: HttpClient,
    private toastr: ToastrService,
    private _router: Router,
    private auth: AuthenticationService
  ) {}

  async createTask(task: ITask) {
    if (!this.auth.isAuthenticated$) {
      this.toastr.error('Please login');
      return;
    }

    let bearerToken: IUser = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

    if (!task.title) {
      throw new Error('Task title not provided');
    }

    try {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${bearerToken.token}`,
        }),
      };

      this.http
        .post<any>(`api/tasks`, task, httpOptions)
        .pipe(
          catchError((error) => {
            if (error) {
              this.toastr.error(JSON.stringify(error));
            }
            return throwError(error);
          })
        )
        .subscribe((data) => {
          this.toastr.success('Task Created Successfully');
          this.modal.close();

          // Handle the rest of the logic as needed (e.g., update UI, navigate, etc.)
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getTasks(): Promise<any[]> {
    try {
      if (!this.auth.isAuthenticated$) {
        throw new Error('User not authenticated');
      }

      let bearerToken: IUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${bearerToken.token}`,
        }),
      };

      //@ts-ignore
      const tasks = this.http
        .get<any[]>('api/tasks', httpOptions)
        .pipe(
          catchError((error) => {
            if (error) {
              this.toastr.error(JSON.stringify(error));
            }
            return throwError(error);
          })
        )
        .toPromise(); // Convert the observable to a promise
      console.log(await tasks, 'service');
      //@ts-ignore
      return tasks;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTaskById(taskId: string): Promise<ITask | null> {
    try {
      if (!taskId) {
        throw new Error('Task ID is required');
      }

      const bearerToken: IUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${bearerToken.token}`,
        }),
      };

      const task = await this.http
        .get<ITask>(`api/tasks/${taskId}`, httpOptions)
        .pipe(
          catchError((error) => {
            if (error) {
              this.toastr.error(JSON.stringify(error));
            }
            return throwError(error);
          })
        )
        .toPromise();

      //@ts-ignore
      return task;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateTaskById(taskId: string, updatedTask: ITask): Promise<void> {
    try {
      if (!this.auth.isAuthenticated$) {
        throw new Error('User not authenticated');
      }

      let bearerToken: IUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${bearerToken.token}`,
        }),
      };

      await this.http
        .put(`api/tasks/${taskId}`, updatedTask, httpOptions)
        .pipe(
          catchError((error) => {
            if (error) {
              this.toastr.error(JSON.stringify(error));
            }
            return throwError(error);
          })
        )
        .toPromise();

      this.toastr.success('Task Updated Successfully');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateTaskStatus(taskId: string, status: string): Promise<any> {
    try {
      if (!this.auth.isAuthenticated$) {
        throw new Error('User not authenticated');
      }

      let bearerToken: IUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${bearerToken.token}`,
        }),
      };

      const updatedData = {
        status: status,
      };

      console.log(updatedData);

      const data = this.http
        .patch<any>(`api/tasks/${taskId}/status`, updatedData, httpOptions)
        .pipe(
          catchError((error) => {
            if (error) {
              this.toastr.error(JSON.stringify(error));
            }
            return throwError(error);
          })
        )
        .toPromise(); // Convert the observable to a promise
      console.log(await data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
