import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-viewadmin',
  templateUrl: './viewadmin.page.html',
  styleUrls: ['./viewadmin.page.scss'],
})
export class ViewadminPage implements OnInit {

 
  listaDeUsuarios = [];
  listaLugares = [];


  constructor(
    private database: DatabaseService,
    private toastr: ToastController,
    public afauth: AngularFireAuth,
  ) { }


  ngOnInit() {
    this.database.getAll('user').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeUsuariosRef => {

        this.listaDeUsuarios = listaDeUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log(this.listaDeUsuarios);
      })
    })
  }

  eliminar(id) {
    this.database.delete('user', id).then(res => {
      this.toast ('Usuario eliminado exitosamente', 'success');
    }).catch(err => {
      console.log("ERROR al eliminar ", err);
    });
  }
  
  

  eliminarLugar(id,place) {
    this.database.delete(`user/${id}/Lugares`, place).then(res => {
      this.toast ('Lugar eliminado exitosamente', 'success');
    }).catch(err => {
      console.log("ERROR al eliminar ", err);
    });
    this.database.delete(`Lugares`, place).then(res => {
      
    }).catch(err => {
      console.log("ERROR al eliminar ", err);
    });
  }

  lugaresPorId(id) {

    const uid = id;
        this.database
          .getPlaces(`user/${uid}/Lugares/`)
          .then((firebaseResponse) => {
            firebaseResponse.subscribe((listaLugaresRes) => {
              this.listaLugares = listaLugaresRes.map((places) => {
                let lugar = places.payload.doc.data();

                return lugar;
              });
              console.log(this.listaLugares);
            });
          });

    
  }

  async toast (message,status){
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position:'top',
      duration: 2000
    });

    toast.present();
  }

}
