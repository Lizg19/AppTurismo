import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CoordInfo } from '../models/coord-info.models';
import { Marker } from '../models/marker.model';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
declare var google;
@Component({
  selector: 'app-viewplacespropietario',
  templateUrl: './viewplacespropietario.page.html',
  styleUrls: ['./viewplacespropietario.page.scss'],
})
export class ViewplacespropietarioPage implements OnInit {
  lugar = {
    latitude: Number,
    longitude: Number,
    place: String,
    description: String,
    caracteristica: String,
    image: String,
  };

  newLugar = []
  newFile: '';
  newImage = '';



  listaLugares = [];
  // MAPA
  map = null;
  marker: Marker = {
    position: {
      lat: -0.1877174,
      lng: -78.5109762,
    },
  };
  coordIngo: CoordInfo = null;
  constructor(
    public database: DatabaseService,
    public afauth: AngularFireAuth,
    private router: Router,
    private toastr: ToastController,
    private LoadingCtrl: LoadingController,


  ) { }

  gotoMap(latitude, longitude) {
    console.log(latitude, longitude);
    this.router.navigate(['/map']);
  }
  ngOnInit() {
    this.afauth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
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
    });
  }

  eliminarLugar(id, place) {
    this.database.delete(`user/${id}/Lugares`, place).then(res => {
      this.toast('Lugar eliminado exitosamente', 'success');
    }).catch(err => {
      console.log("ERROR al eliminar ", err);
    });
    this.database.delete(`Lugares`, place).then(res => {

    }).catch(err => {
      console.log("ERROR al eliminar ", err);
    });
  }

  async modificarLugar(id, place) {
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
        image: this.lugar.image
      }
    }

    this.database.updateDoc(this.newLugar, `user/${id}/Lugares`, place).then(res => {

  
        this.database.updateDoc(data, `user/${id}/Lugares`, place).then(res => {

        }).catch(err => {

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


  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000,
    });

    toast.present();
  }
}
