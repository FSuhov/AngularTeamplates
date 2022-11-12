import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { CognitoService, IUser } from '../cognito.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isAuthenticated: boolean;
  userName: string;

  loading: boolean;
  user: IUser;  

  constructor(private router: Router,
    private cognitoService: CognitoService, 
    private http: HttpClient) { 
      this.isAuthenticated = false;
      this.loading = false;
      this.user = {} as IUser;
    }

  ngOnInit(): void {
    console.log("onInit");
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
      this.cognitoService.getUser()
      .then(value => {
        this.userName = value.username;
        console.log(value.username);
      })
      console.log(this.isAuthenticated);     
    });    
  }
  

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then(() => {
      this.router.navigate(['/list']);
      this.isAuthenticated = true;
      this.userName = this.user.name;
    }).catch(() => {
      this.loading = false;
    });
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.isAuthenticated = false;
      this.userName = null;
      this.router.navigate(['/']);
    });
  }

}
