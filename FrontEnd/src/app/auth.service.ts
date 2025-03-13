import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: any;
  private userSub = new BehaviorSubject<any>(null);
  private adminSub = new BehaviorSubject<boolean>(false);
  private loggedUserSub = new BehaviorSubject<boolean>(false);

  apiUrl = "http://127.0.0.1:5001/uservizsgaremek/us-central1/api/";

  constructor(private afAuth: AngularFireAuth, private router: Router, private http: HttpClient) {
    // Ellenőrizzük, hogy van-e bejelentkezett felhasználó az előző munkamenetből
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser) {
      this.loggedUser = JSON.parse(savedUser);
      this.loggedUserSub.next(true);
      this.userSub.next(this.loggedUser);
    }

    // Firebase authState feliratkozás
    this.afAuth.authState.subscribe(
      (user: any) => {
        if (user) {
          this.loggedUser = user?._delegate;
          console.log("ZUser", user);

          user.getIdToken().then(
            (t: any) => {
              this.loggedUser.accessToken = t;
              const headers = new HttpHeaders().set('Authorization', this.loggedUser.accessToken);
              this.http.get(this.apiUrl + "getClaims/" + user.uid, { headers }).subscribe(
                {
                  next: (claims) => {
                    this.loggedUser.claims = claims;
                    this.userSub.next(this.loggedUser);
                    this.adminSub.next(this.loggedUser.claims.admin);
                    this.loggedUserSub.next(true);
                    localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser)); // Mentjük el a felhasználót localStorage-ba
                  },
                  error: (error) => {
                    console.log(error);
                    this.loggedUser = null;
                    this.userSub.next(null);
                    this.adminSub.next(false);
                    this.loggedUserSub.next(false);
                  }
                }
              );
            })
            .catch(
              (error: any) => console.log(error)
            );
        } else {
          this.loggedUser = null;
          this.userSub.next(null);
          this.adminSub.next(false);
          this.loggedUserSub.next(false);
          localStorage.removeItem('loggedUser'); // Ha nincs bejelentkezve, töröljük a localStorage-ból
        }
      }
    );
  }

  // Admin státusz ellenőrzése
  getIsAdmin() {
    return this.adminSub;
  }

  // Bejelentkezett felhasználó ellenőrzése
  getIsLoggedUser() {
    return this.loggedUserSub;
  }

  // Felhasználók lekérése
  getUsers() {
    if (this.loggedUser.accessToken) {
      const headers = new HttpHeaders().set('Authorization', this.loggedUser.accessToken);
      return this.http.get(this.apiUrl + "users", { headers });
    }
    return null;
  }

  // Felhasználói jogosultságok beállítása
  setUserClaims(uid: any, claims: any) {
    if (this.loggedUser.accessToken) {
      let body = {
        claims: claims,
        uid: uid
      };
      const headers = new HttpHeaders().set('Authorization', this.loggedUser.accessToken);
      return this.http.post(this.apiUrl + "setCustomClaims", body, { headers });
    }
    return null;
  }

  // Felhasználói adatok frissítése
  updateUser(displayName: any, phoneNumber: any, email: any) {
    if (this.loggedUser.accessToken) {
      let body = { displayName, phoneNumber, email };
      const headers = new HttpHeaders().set('Authorization', this.loggedUser.accessToken);
      return this.http.patch(this.apiUrl + "updateUser/", body, { headers });
    }
    return null;
  }

  // Jelenlegi felhasználó lekérése
  getLoggedUser() {
    return this.userSub;
  }

  // Google bejelentkezés
  googleAuth() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  // Kilépés
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.loggedUserSub.next(false);
      this.router.navigate(['/login']);
      localStorage.removeItem('loggedUser'); // Kilépés után töröljük a localStorage-ból a felhasználót
    });
  }

  // Email és jelszó alapú regisztráció
  signUpMailPassword(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.currentUser.then(user => {
          user?.sendEmailVerification();
        })
          .then(() => {
            this.router.navigate(['/']);
            this.loggedUserSub.next(true);
          })
          .catch(error => {
            console.error("Hiba a regisztrációnál:", error);
            alert(error.message);
          });
      })
      .catch(error => {
        console.error("Hiba a felhasználó létrehozásakor:", error);
        alert(error.message);
      });
  }

  // Email és jelszó alapú bejelentkezés
  signInMailPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loggedUserSub.next(true);
        this.router.navigate(['/']);
      });
  }

  // Jelszó visszaállító email küldése
  forgotPassword(email: any) {
    this.afAuth.sendPasswordResetEmail(email).then(
      () => console.log("mail elküldve!")
    );
  }
}
