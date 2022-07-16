import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-viewadmin',
  templateUrl: './viewadmin.page.html',
  styleUrls: ['./viewadmin.page.scss'],
})
export class ViewadminPage implements OnInit {

 
  listaDeUsuarios = [];

  constructor(
    private database: DatabaseService,
    private toastr: ToastController,
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

  obtenerPorId(id) {

    this.database.getById('user', id).then(res => {
      res.subscribe(docRef => {
        let usuario = docRef.data();
        usuario['id'] = docRef.id;
        console.log(usuario)
      })
    })
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
