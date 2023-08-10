import { FilterTasksByStatusPipe } from './filter-tasks-by-status.pipe';

describe('TaskStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTasksByStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
