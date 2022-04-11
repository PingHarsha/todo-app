import {TodoListItem} from './todo-list-item';
import {faker} from '@faker-js/faker';

describe('TodoListItem', () => {
  it('should create an instance', () => {
    expect(new TodoListItem(faker.name.findName(),
      faker.random.alphaNumeric(5),
      faker.date.future(),
      1,
      faker.date.past())).toBeTruthy();
  });
});
