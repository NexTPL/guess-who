// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBbQsujH8G5HTrTj6wVVX9LjORQJth9b4Q',
	authDomain: 'guess-who-260af.firebaseapp.com',
	projectId: 'guess-who-260af',
	storageBucket: 'guess-who-260af.appspot.com',
	messagingSenderId: '360046524903',
	appId: '1:360046524903:web:8fa31d702e03c35bb26542',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
