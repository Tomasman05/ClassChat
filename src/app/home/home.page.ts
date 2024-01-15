import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages:any
  newMessage:any
  userName="Lajos"
  constructor(private base:BaseService) {
    this.base.getMessages().snapshotChanges()
    .pipe(
      map( (ch)=> ch.map(
        (c)=>({ key:c.payload.key, ...c.payload.val()})
      ))
    )
    .subscribe((res)=>this.messages=res)
  }

  addMessage(){
    let body={
      user:this.userName, 
      time:new Date().toLocaleTimeString(), 
      content:this.newMessage }
    this.base.addMessage(body)
    this.newMessage=""


  }
  deleteMessage(body:any){
    this.base.deleteMessage(body)
  }
}
