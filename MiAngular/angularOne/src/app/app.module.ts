import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire'; // Firebase config
import { AngularFirestoreModule } from '@angular/fire/firestore'; // For Cloud Firestore
import { environment } from 'src/environments/environment'; // Config

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Import firebase
    AngularFirestoreModule, // Import firestore
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TodoFormComponent]
})
export class AppModule { }
