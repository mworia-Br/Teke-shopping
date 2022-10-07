import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export var firebaseConfig = {
  apiKey: "AIzaSyD7-2PbB5JORAI1ZyPkJftTDm9ESVpCBII",
  authDomain: "hotspiced-delivery-co-ke.firebaseapp.com",
  databaseURL: "https://hotspiced-delivery-co-ke-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotspiced-delivery-co-ke",
  storageBucket: "hotspiced-delivery-co-ke.appspot.com",
  messagingSenderId: "1090787145567",
  appId: "1:1090787145567:web:49a950090ae54bad1e68ea",
  measurementId: "G-2MFLMCCB4B"
};

var firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export default firebaseApp;
