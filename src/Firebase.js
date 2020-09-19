import firebase from 'firebase/app'
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDppfPGh5IjU6lxYDdZFN7uZK9gxxB1HMs",
    authDomain: "lilypopins-9e81d.firebaseapp.com",
    databaseURL: "https://lilypopins-9e81d.firebaseio.com",
    projectId: "lilypopins-9e81d",
    storageBucket: "lilypopins-9e81d.appspot.com",
    messagingSenderId: "572442350027",
    appId: "1:572442350027:web:d0fc56d6d928658e37a64e",
    measurementId: "G-YH254JTF9X",
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export { storage, firebase as default };