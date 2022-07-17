import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Marker } from '../models/marker.model';
import { CoordInfo } from '../models/coord-info.models';
import { userInfo } from 'os';
declare var google;
@Component({
  selector: 'app-viewpropietario',
  templateUrl: './viewpropietario.page.html',
  styleUrls: ['./viewpropietario.page.scss'],
})
export class ViewpropietarioPage implements OnInit {
  nameplace: string;
  descriplace: string;
  characplace: string;

  latitude: number;
  longitude: number;
  map = null;
  newImage = '';
  newFile: '';
  marker: Marker = {
    position: {
      lat: -0.10796760303555347,
      lng: -78.47342804271227,
    },
  };
  coordIngo: CoordInfo = null;
  constructor(
    public database: DatabaseService,
    public afauth: AngularFireAuth,
    public geolocation: Geolocation,
    private router: Router,
    private toastr: ToastController
  ) {}

  async ngOnInit() {
    await this.geolocationNative();
    await this.loadMap();
   
  }

  async guardarProducto() {
    const path = 'Lugares';
    const name = this.nameplace;
    const res = await this.database.uploadImage(this.newFile, path, name);

  

    this.afauth.onAuthStateChanged((user) => {
      if (user) {
        const data = {
          latitude: this.latitude,
          longitude: this.longitude,
          place: this.nameplace,
          description: this.descriplace,
          caracteristica: this.characplace,
          image: res,
          id:user.uid
        };
        const uid = user.uid;
        const pathUsuarios = `user/${uid}/Lugares/`;
        const pathLugares =`Lugares`;
        const id = this.nameplace;
        this.database.createDoc(data, pathUsuarios, id);
        this.database.createDoc(data, pathLugares, id);
      }
    });
    this.toast('Lugar agregado correctamente', 'success');
    this.router.navigate(['/home']);
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
  ngAfterViewInit() {
    this.geolocationNative();
  }

  async geolocationNative() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.latitude = geoposition.coords.latitude;
      this.longitude = geoposition.coords.longitude;
      this.marker.position.lat = this.latitude;
      this.marker.position.lng = this.longitude;
    });
  }
  async loadMap() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      const latitude = geoposition.coords.latitude;
      const longitude = geoposition.coords.longitude;
      const mapEle: HTMLElement = document.getElementById('map');
      console.log(this.marker.position.lat, this.marker.position.lng);
      const myLating = {
        lat: latitude,
        lng: longitude,
      };
      this.map = new google.maps.Map(mapEle, {
        center: myLating,
        zoom: 17,
      });
      console.log(
        'MANDA 3',
        this.marker.position.lat,
        this.marker.position.lng
      );
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.addMarker(this.marker);
        mapEle.classList.add('show-map');
      });
    });
  }
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
    });
  }

}
 
 