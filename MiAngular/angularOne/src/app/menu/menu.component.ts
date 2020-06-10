import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userDisplayName: string;
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.userDisplayName = sessionStorage.getItem('loggedUser');
  }

  logout() {
    this.afAuth.signOut();

  }
}
