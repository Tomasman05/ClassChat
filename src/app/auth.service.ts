import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSub=new Subject()
  confirm:any

  constructor(private fireAuth:AngularFireAuth, private router:Router) { 
    this.fireAuth.onAuthStateChanged(
      (user)=>{this.userSub.next(user)}
    )
  }
  getUser(){
    return this.userSub;
  }
  logout(){
    this.fireAuth.signOut().then(
      ()=>this.router.navigate(['/home'])
    )
  }
  
  signInWithPhone(phoneNumber:any, aqpplicationVerifier:any){

    return new Promise<any>(
      (resolve, reject)=>{
        this.fireAuth.signInWithPhoneNumber(phoneNumber,aqpplicationVerifier)
        .then((confirm)=>{
          this.confirm=confirm
          resolve(true)
        })
        .catch(
          ()=>reject('SMS not send')
        )}
    )}

  verificationCode(code:any){
    return this.confirm.confirm(code)
  }

}