importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAw6PDvPLHS4G4qQwMl3PFTyf7-evX80FU",
    authDomain: "healthera-connect.firebaseapp.com",
    databaseURL: "https://healthera-connect.firebaseio.com",
    projectId: "healthera-connect",
    storageBucket: "healthera-connect.appspot.com",
    messagingSenderId: "118120875233"
})

const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    }
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
})