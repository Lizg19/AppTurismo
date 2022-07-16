import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-viewturista',
  templateUrl: './viewturista.page.html',
  styleUrls: ['./viewturista.page.scss'],
})
export class ViewturistaPage implements OnInit {
  lugar = {
    latitude: -0.1877174,
    longitude: -78.5109762,
    place: 'Kevin',
    description: 'Chao',
    caracteristica: 'HOLA',
    image:
      'https://images.unsplash.com/photo-1495562569060-2eec283d3391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9tYW50aWMlMjBwbGFjZXxlbnwwfHwwfHw%3D&w=1000&q=80',
  };
  listaLugares = [];

  constructor(
    public database: DatabaseService,
    public afauth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.database.getPlaces(`Lugares`).then((firebaseResponse) => {
      firebaseResponse.subscribe((listaLugaresRes) => {
        this.listaLugares = listaLugaresRes.map((places) => {
          let lugar = places.payload.doc.data();
          return lugar;
        });
        
        console.log("HOLA",this.listaLugares);
      });
    });
  }
}
