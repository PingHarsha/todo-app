import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {TodoListItem} from "../classes/todo-list-item";
import {TodoItem} from "../classes/todo-item";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly url = environment.url;

  constructor(private readonly http: HttpClient) {
  }

  getAll = (): Observable<Array<TodoListItem>> => this.http.get<Array<TodoListItem>>(`${this.url}/todos`);

  createTodo = (todo: TodoItem): Observable<TodoListItem> => this.http.post<TodoListItem>(`${this.url}/todos`, todo);

  getTodoById = (id: number): Observable<TodoListItem> => this.http.get<TodoListItem>(`${this.url}/todos/${id}`);

  updateTodoById = (id: number, todo: TodoItem): Observable<TodoListItem> => this.http.put<TodoListItem>(`${this.url}/todos/${id}`, todo);

  deleteTodoById = (id: number): Observable<boolean> => this.http.delete<boolean>(`${this.url}/todos/${id}`);
}
