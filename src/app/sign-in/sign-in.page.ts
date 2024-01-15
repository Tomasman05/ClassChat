import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { getAuth, RecaptchaVerifier } from "firebase/auth";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  phoneNumber = "+36303236954"
  code = '111111'
  recaptchaInvisible: any
  constructor(private auth: AuthService) { }

  ionViewDidEnter() {
    this.recaptchaInvisible = new RecaptchaVerifier(
      getAuth(),
      'recaptcha-container',
      {
        'size': 'invisible',
        'callback': '',
        'expired-callback': ''
      }
    )
  }


  signInWithPhone() {
    this.auth.signInWithPhone(this.phoneNumber, this.recaptchaInvisible).then(
      () => { console.log("SMS sent") }

    ).catch(
      (error: any) => {
        console.log("error:", error)
      }
    )
  }
  verificationCode() {
    this.auth.verificationCode(this.code).then(
      (user: any) => {
        console.log("User", user)
      }
    ).catch(
      (error: any) => {
        console.log("Code hiba!")
      }
    )
  }

}