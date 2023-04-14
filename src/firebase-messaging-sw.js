importScripts("https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyD9SoPFbJYz20Ff9hpLzRWm9rEi-CIhzuU",
    authDomain: "knightwash-webui-angular.firebaseapp.com",
    databaseURL: "https://knightwash-webui-angular-default-rtdb.firebaseio.com",
    projectId: "knightwash-webui-angular",
    storageBucket: "knightwash-webui-angular.appspot.com",
    messagingSenderId: "520468779662",
    appId: "1:520468779662:web:44669bcaa901dee227afdf",
    measurementId: "G-KDKV25LE4T",
    vapidKey: "BFL4nWRuFSROta_ZiCG_fh6tdUnZZqi_0avQkSTUxe-OYFfvOrm65ZBnWpMuZHz6XdJ4t-zUX_TvEd-Bktfioys"
});
const messaging = firebase.messaging();

// importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");