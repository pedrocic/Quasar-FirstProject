// import something here

// "async" is optional
// export default async ({ /* app, router, Vue, ... */ }) => {
//   // something to do
// }

import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBLuAC1xMMMWVceTxCLEqEQCRtIcdjQXEQ",
    authDomain: "starry-sylph-258302.firebaseapp.com",
    databaseURL: "https://starry-sylph-258302.firebaseio.com",
    projectId: "starry-sylph-258302",
    storageBucket: "starry-sylph-258302.appspot.com",
    messagingSenderId: "804542311924",
    appId: "1:804542311924:web:3fceaf1b88a41224701da1",
    measurementId: "G-SHBZ89EC0R"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);

let firebaseAuth = firebaseApp.auth();

let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb }


