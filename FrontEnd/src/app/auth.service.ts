import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FacebookAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser:any
  private userSub= new BehaviorSubject<any>(null)
  private adminSub= new BehaviorSubject<boolean>(false)
  private loggedUserSub= new BehaviorSubject<boolean>(false)

  apiUrl="http://127.0.0.1:5001/uservizsgaremek/us-central1/api/"
  // apiUrl="https://api-k6azligg6q-uc.a.run.app/"


  constructor(private afAuth:AngularFireAuth, private router:Router, private http:HttpClient) {
    this.afAuth.authState.subscribe(
      (user:any)=>{
        if (user){
          this.loggedUser=user?._delegate
          console.log("ZUser", user)
         
          user.getIdToken().then(
          (t:any)=>{
            console.log("Token",t)
            this.loggedUser.accessToken=t
            const headers= new HttpHeaders().set('Authorization',this.loggedUser.accessToken)
            this.http.get(this.apiUrl+"getClaims/"+user.uid, {headers}).subscribe(
              {
                next:(claims)=>{ 
                    console.log("Sikeres claims lekérés", claims)
                    this.loggedUser.claims=claims
                    this.userSub.next(this.loggedUser)
                    this.adminSub.next(this.loggedUser.claims.admin)
                    this.loggedUserSub.next(true)
                    console.log("User: ",this.loggedUser)
                  },
                error:(error)=>{
                  console.log(error)
                  this.loggedUser=null
                  this.userSub.next(null)
                  this.adminSub.next(false)
                  this.loggedUserSub.next(false)
                }
                
            }
            )
          })
          .catch(
          (error:any)=>console.log(error)
          )
      

          // user.getIdToken().then(
          //   (t:any)=>{
          //     this.loggedUser.token=t
          //     console.log("token", this.loggedUser.token)
          //   }
          // )
         
        }
        else {
          this.loggedUser=null
          this.userSub.next(null)
          this.adminSub.next(false)
          this.loggedUserSub.next(false)
        }
      }
    )
   }
   getIsAdmin(){
    return this.adminSub
   }
   getIsLoggedUser(){
    return this.loggedUserSub
   }

   getUsers(){
    if (this.loggedUser.accessToken)
    {
      const headers= new HttpHeaders().set('Authorization',this.loggedUser.accessToken)
      return this.http.get(this.apiUrl+"users", {headers})
    }
    return null
  }
  setUserClaims(uid:any,claims:any){
    if (this.loggedUser.accessToken)
      {
        let body={
          claims:claims,
          uid:uid
        }
        const headers= new HttpHeaders().set('Authorization',this.loggedUser.accessToken)
        return this.http.post(this.apiUrl+"setCustomClaims",body, {headers})
      }
      return null
  }

  updateUser(displayName:any, phoneNumber:any, email:any){
    if (this.loggedUser.accessToken)
      {
        let body={displayName, phoneNumber, email}
        const headers= new HttpHeaders().set('Authorization',this.loggedUser.accessToken)
        return this.http.patch(this.apiUrl+"updateUser/",body, {headers})
      }
      return null
  }

   getLoggedUser(){
    return this.userSub
   }

  googleAuth(){
    console.log("3")
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }
  facebookAuth(){
    return this.afAuth.signInWithPopup(new FacebookAuthProvider())
  }
  signOut(){
    return this.afAuth.signOut()
  }

  signUpMailPassword(email:string, password:string){
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(()=>{
      this.afAuth.currentUser.then(
        (user)=>{
          user?.sendEmailVerification()
        }
      ).then(
        ()=>this.signOut()
      ).
      then(
        ()=> this.router.navigate(['verifymail'])
      )
      .catch((e)=>alert(e))
    })
  }

  signInMailPassword(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  forgotPassword(email:any){
    this.afAuth.sendPasswordResetEmail(email).then(
      ()=>console.log("mail elküldve!")
    )
  }
  getCharacter(){
    let url="https://localhost:7165/api/Characters"

    let headers= new HttpHeaders().set('Authorization',`Bearer ${this.loggedUser.accessToken}`)
    return this.http.get(url, {headers})
  } 
}
