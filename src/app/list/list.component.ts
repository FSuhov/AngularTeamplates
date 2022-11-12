import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CognitoService, IUser } from '../cognito.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private cognitoService: CognitoService, 
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUser(){
    this.cognitoService.getUser()
    .then((value) => {
      console.log(value.username);
      
    }).catch(() => {      
    });
  }

  getSubject(){
    const a = this.cognitoService.getStore();
    //console.log(a);
  }

}
