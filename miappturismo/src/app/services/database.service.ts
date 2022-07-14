import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    public database: AngularFirestore,
    public fireStorage: AngularFireStorage
    ) {

   }
   // CREA LA BASE
   createDoc(data: any, path: string, id: string){
    const collection= this.database.collection(path);
    return collection.doc(id).set(data);
   }
   // LEE UN DOCUMENTO DE LA BASE
   getDoc(path:string,id:string){
    const collection=this.database.collection(path);
    return collection.doc(id).valueChanges();
   }
   // ELMINA UN DOCUMENTO DE LA BASE
   deleteDoc(path:string, id:string){
    const collection=this.database.collection(path);
    return collection.doc(id).delete();
   }
   // ACTUALIZA UN DOCUMENTO DE LA BASE
   updateDoc(data:any,path:string, id:string){
    const collection=this.database.collection(path);
    return collection.doc(id).update(data);
   }

   uploadImage (file: any, path: string, nombre: string): Promise<string>{
    return new Promise (resolve => {
      const filePath = path + "/" + nombre;
      const ref= this.fireStorage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(  () => {
              ref.getDownloadURL().subscribe( res => {
                const downloadURL = res;
                resolve(downloadURL);
                return;
              });
        })
     )
    .subscribe();
  });
}
}
