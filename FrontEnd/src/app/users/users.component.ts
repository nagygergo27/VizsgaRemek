import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  loggedUser:any
  users:any
  constructor( private auth:AuthService){
    this.auth.getLoggedUser().subscribe(
      (loggedUser)=>{
        this.loggedUser=loggedUser
        console.log("Users logged23:::", this.loggedUser)
        if (this.loggedUser){ 
          console.log("Lekérjük a usereket!!!!")
          this.auth.getUsers()?.subscribe(
          (users)=>this.users=users
        )
        
      }
    }

    )
  }

  setCustomClaims(uid:any, claims:any){
    this.auth.setUserClaims(uid, claims)?.subscribe(
      ()=>console.log("Claims beállítás!")
    )
  }

  change(uid:any){
    let tomb=this.users.filter(
      (elem:any)=>elem.uid==uid
    )
    console.log(tomb)
    this.auth.setUserClaims(uid,tomb[0].claims)?.subscribe()

  }
}