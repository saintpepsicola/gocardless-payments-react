import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/messaging'
export default firebase.initializeApp({
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_ID
})