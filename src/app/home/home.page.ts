import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  messages: any;
  newMessage: any;
  userName:any;

  constructor(private base: BaseService, private auth: AuthService, private router: Router) {
    this.base.getMessages().snapshotChanges()
      .pipe(
        map((ch) => ch.map(
          (c) => ({ key: c.payload.key, ...c.payload.val() })
        ))
      )
      .subscribe((res) => this.messages = res);

    this.auth.getUser().subscribe(
      (user: any) => this.userName = user?.phoneNumber
    );
  }

  addMessage() {
    let body = {
      user: this.userName,
      time: new Date().toLocaleTimeString(),
      content: this.newMessage
    };
    this.base.addMessage(body);
    this.newMessage = "";
  }

  deleteMessage(body: any) {
    this.base.deleteMessage(body);
  }

  logout() {
    this.auth.logout();
  }
}
