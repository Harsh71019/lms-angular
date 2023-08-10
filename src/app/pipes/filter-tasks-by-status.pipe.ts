import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTasksByStatus',
})
export class FilterTasksByStatusPipe implements PipeTransform {
  transform(tasks: any[], status: string): any[] {
    if (!tasks || !status) {
      return tasks;
    }
    return tasks.filter((task) => task.status === status);
  }
}
