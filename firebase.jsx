import * as firebase from 'firebase'

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfv4J2reh-yhprlwXg2IjTRseTuwtcNwk",
  authDomain: "okwu-bf41e.firebaseapp.com",
  projectId: "okwu-bf41e",
  storageBucket: "okwu-bf41e.appspot.com",
  messagingSenderId: "470273657654",
  appId: "1:470273657654:web:d76b18e402305201344197"
};

let app;

if(firebase.apps.length=== 0){
  app=firebase.initializeApp(firebaseConfig);
} else {
  app=firebase.app()
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth }