import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-viewpropietario',
  templateUrl: './viewpropietario.page.html',
  styleUrls: ['./viewpropietario.page.scss'],
})
export class ViewpropietarioPage implements OnInit {
  nameplace: string;
  descriplace: string;
  characplace: string;

  constructor(
    public database: DatabaseService,
    private afauth: AngularFireAuth,

  ) {

   }

  ngOnInit() {
  }
  guardarProducto(){
    const data={
      place: this.nameplace,
      description: this.descriplace,
      caracteristica: this.characplace,
    };

    this.afauth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const path= `user/${uid}/Lugares/`;
        const id = this.nameplace
        this.database.createDoc(data, path, id)

      } 
    });
    
    
  }
}
