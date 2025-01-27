import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../services/todo.service';
import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { Todo } from '../models/todo';
import { TodoViewModel } from '../models/todo-view-model';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {}
  todoForm: FormGroup;
  createMode = true;
  todo: TodoViewModel;
  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      done: false,
    });

    if (!this.createMode) {
      this.loadTodo(this.todo);
    }

    this.afAuth.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  loadTodo(todo) {
    this.todoForm.patchValue(todo);
  }
  saveTodo() {
    if (this.todoForm.invalid) {
      return;
    }

    if (this.createMode) {
      const todo: Todo = this.todoForm.value;
      todo.lastModifiedDate = new Date();
      todo.createdDate = new Date();
      todo.userId = this.user.uid;
      this.todoService
        .saveTodo(todo)
        .then((response) => this.handleSuccessfulSaveTodo(response, todo))
        .catch((err) => console.error(err));
    } else {
      const todo: TodoViewModel = this.todoForm.value;
      todo.id = this.todo.id;
      todo.lastModifiedDate = new Date();
      this.todoService
        .editTodo(todo)
        .then(() => this.handleSuccessfulEditTodo(todo))
        .catch((err) => console.error(err));
    }
  }

  handleSuccessfulSaveTodo(response: DocumentReference, todo: Todo) {
    this.activeModal.dismiss({ todo, id: response.id, createMode: true });
  }

  handleSuccessfulEditTodo(todo: TodoViewModel) {
    this.activeModal.dismiss({ todo, id: todo.id, createMode: false });
  }
}
