import { Injectable, inject } from '@angular/core';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Contact } from 'src/models/contact.class';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private firestore: Firestore = inject(Firestore)) { }

  async setContact(contact: Contact) {
    const itemCollection = collection(this.firestore, 'contacts');
    // setDoc(doc(itemCollection), this.contact.toJson());
    await addDoc(itemCollection, contact.toJson());
  }

  async getContacts() {
    const itemCollection = collection(this.firestore, 'contacts');
    let contacts$ = collectionData(itemCollection, {
      idField: 'id'
    });
    return contacts$;
  }

  getSingleContact(id: string) {
    const itemDoc = doc(this.firestore, 'contacts', id);
    let contact$ = docData(itemDoc);
    return contact$;
  }

  async updateContact(id: string, contact: any) {
    const itemDoc = doc(this.firestore, 'contacts', id);
    await setDoc(itemDoc, contact.toJson());
  }
}
