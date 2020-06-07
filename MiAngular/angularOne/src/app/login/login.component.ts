import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private fb: FormBuilder,
              private ngZone: NgZone) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.router.navigate(['/todos']);
        });
  }
});
  }
  createUser() {
    this.afAuth.createUserWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
       this.router.navigate(['/todos']);
     }).catch(response => {
       this.errorMessage = response.message;
     });
    }
   signIn() {
    this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
       this.router.navigate(['/todos']);
     }).catch(response => {
       this.errorMessage = response.message;
     });
  }
}
