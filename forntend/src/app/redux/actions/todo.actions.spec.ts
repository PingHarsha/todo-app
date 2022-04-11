import * as fromTodo from './todo.actions';

describe('todoTodos', () => {
  it('should return an action', () => {
    expect(fromTodo.todoTodos().type).toBe('[Todo] Todo Todos');
  });
});
