import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-viewadmin',
  templateUrl: './viewadmin.page.html',
  styleUrls: ['./viewadmin.page.scss'],
})
export class ViewadminPage implements OnInit {

 
  listaDeUsuarios = [];
  listaLugares = [];

  newLugar = []
  newFile: '';
  newImage = '';



  constructor(
    private database: DatabaseService,
    private toastr: ToastController,
    public afauth: AngularFireAuth,
    private LoadingCtrl: LoadingController,

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

  async modificar(id, place,imagen) {
    const loading = await this.LoadingCtrl.create({
      message: 'Modificando...',
      spinner: 'crescent',
      showBackdrop: true
    });

    loading.present();
    const path = 'Lugares';
    const name = place;
    const res = await this.database.uploadImage(this.newFile, path, name);
    let data ={}
    if (this.newFile!=='' && this.newImage!==''){
      data = {
        image: res
      }
    } else{
      data = {  
        image: imagen
      }
    }

    
    this.database.updateDoc(this.newLugar, `user/${id}/Lugares`, place).then(res => {

      this.database.updateDoc(data, `user/${id}/Lugares`, place).then(res => {

      }).catch(err => {
        console.log("ERROR al modificar ", err);

      });
          
      

      this.database.updateDoc(this.newLugar, '/Lugares/', place).then(res => {

      }).catch(err => {
        console.log("ERROR al modificar ", err);
      });

      
      this.database.updateDoc(data, '/Lugares/', place).then(res => {

      }).catch(err => {
        console.log("ERROR al modificar ", err);
      });
      

       
      
      loading.dismiss();
      this.toast('Lugar modificado exitosamente', 'success');
    }).catch(err => {
      loading.dismiss();
      console.log("ERROR al modificar ", err);
    });



  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newImage = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.toast('Imagen nueva cargada correctamente.', 'success');

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
