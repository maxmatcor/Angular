import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private ngZone: NgZone){}

  ngOnInit(){
    this.afAuth.onAuthStateChanged(user => {
      if (user){
        this.user = user;
      } else{
        this.user = null;
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
    }
 });
}
}

