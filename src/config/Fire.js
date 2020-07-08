import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDCR4f4qPXjVyZTpXn5GsQlHZoE2k-4ni8",
    authDomain: "fabricioapp-eed8d.firebaseapp.com",
    databaseURL: "https://fabricioapp-eed8d.firebaseio.com",
    projectId: "fabricioapp-eed8d",
    storageBucket: "fabricioapp-eed8d.appspot.com",
    messagingSenderId: "314524906865",
    appId: "1:314524906865:web:91547244e26caead08b2d0",
    measurementId: "G-19S9J4KM2W"
};
// Initialize Firebase
const fire = firebase.initializeApp(config);
export default fire;
