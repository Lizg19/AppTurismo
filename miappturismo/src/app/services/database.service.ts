import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public database: AngularFirestore) {

   }
   // CREA LA BASE
   createDoc(data: any, path: string, id: string){
    const collection= this.database.collection(path);
    return collection.doc(id).set(data);
   }
   // LEE LA BASE
   getDoc(path:string,id:string){
    const collection=this.database.collection(path);
    return collection.doc(id).valueChanges();
   }
   // ELMINA LA BASE
   deleteDoc(path:string, id:string){
    const collection=this.database.collection(path);
    return collection.doc(id).delete();
   }
   // ACTUALIZA 
   updateDoc(data:any,path:string, id:string){
    const collection=this.database.collection(path);
    return collection.doc(id).update(data);
   }
}
