import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  login: boolean = false;
  rol : 'turista' | 'propietario' | 'admin'= null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private database: DatabaseService
  ) { 
    this.auth.stateUser().subscribe(res =>{
      if(res){
        console.log("Estás logueado")
        this.login= true;
        this.getDatosuser(res.uid)
      }else{
        console.log("No estás logueado")
        this.login=false;


      }
    })
  }

  logout() {
    this.auth.signOut();
  }
  gotoPlace(){
    this.router.navigate(['/viewpropietario']);
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  gotoRegister() {
    this.router.navigate(['/register']);
  }
  

  gotoViewPlace() {
    this.router.navigate(['/viewplacespropietario']);
    
  }

  gotoViewTurista() {
    this.router.navigate(['/viewturista']);
    
  }

  gotoViewAdmin() {
    this.router.navigate(['/viewadmin']);
    
  }



  getDatosuser(uid:string){
      const path = 'user';
      const id = uid;

      this.database.getDoc<User>(path, id).subscribe( res =>{
        console.log('datos getDatosuser->',res);
        if (res){
          this.rol = res.perfil
        }
      })
  }
}
