import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: User;
  userDisplayName: string;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private breakpointObserver: BreakpointObserver
  ) {}
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  ngOnInit() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      }
    });
    this.userDisplayName = sessionStorage.getItem('loggedUser');
  }
  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}
