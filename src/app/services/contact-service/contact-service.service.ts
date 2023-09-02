import { Injectable, inject } from '@angular/core';
import { addDoc, collection } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
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
}
