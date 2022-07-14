import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  
  newImage = '';
  newFile: '';

  constructor(
    public database: DatabaseService,
    public afauth: AngularFireAuth,
    private router: Router,
    private toastr: ToastController,


  ) {

   }

  ngOnInit() {
  }
  async guardarProducto(){

    const path ="Lugares";
    const name = this.nameplace;
    const res = await this.database.uploadImage(this.newFile, path, name);

    const data={
      place: this.nameplace,
      description: this.descriplace,
      caracteristica: this.characplace,
      image:res
    };

    this.afauth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const path= `user/${uid}/Lugares/`;
        const id = this.nameplace
        this.database.createDoc(data, path, id)

      } 
    });
    this.toast('Lugar agregado correctamente', 'success');
    this.router.navigate(['/home'])
    
  }


  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.newImage = image.target.result as string;
        });
        reader.readAsDataURL(event.target.files[0]);
      }
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
