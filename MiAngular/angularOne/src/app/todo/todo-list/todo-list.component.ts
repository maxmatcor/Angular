import { Component, OnInit } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '../services/todo.service';
import { TodoViewModel } from '../models/todo-view-model';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  user: User;
  todos: any[];
  handleModalTodoFormClose: any;
  displayedColumns: string[] = [
    'done',
    'title',
    'description',
    'createDate',
    'buttons',
  ];
  dataSource = new MatTableDataSource();
  constructor(
    private modalService: NgbModal,
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.loadTodos(user.uid);
      }
    });
  }

  // tslint:disable-next-line: align
  loadTodos(userId: string) {
    this.todoService.getTodos(userId).subscribe((response) => {
      this.todos = [];
      response.docs.forEach((value) => {
        const data = value.data();
        const id = value.id;
        const todo: TodoViewModel = {
          id,
          title: data.title,
          description: data.description,
          done: data.done,
          createdDate: data.createdDate,
          lastModifiedDate: data.lastModifiedDate.toDate(),
          userId: data.userId,
        };

        this.todos.push(todo);
        this.dataSource.data = this.todos;
      });
    });
  }
  clickAddTodo() {
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.handleModalTodoFormClose.bind(this),
      this.handleModalTodoFormClose.bind(this)
    );
  }
  checkedDone(index: number) {
    const newDoneValue = !this.todos[index].done;
    this.todos[index].done = newDoneValue;
    const obj = { done: newDoneValue };
    const id = this.todos[index].id;
    this.todoService.editTodoPartial(id, obj);
  }

  handleEditClick(todo: TodoViewModel) {
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.handleModalTodoFormClose.bind(this),
      this.handleModalTodoFormClose.bind(this)
    );
    modal.componentInstance.createMode = false;
    modal.componentInstance.todo = todo;
  }
  handleDeleteClick(todoId: string, index: number) {
    this.todoService
      .deleteTodo(todoId)
      .then(() => {
        this.todos.splice(index, 1);
      })
      .catch((err) => console.error(err));
  }
}
