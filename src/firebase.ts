import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA-3IdlIAKtcrXInD5maDGtim6Ikpp2fzk',
  authDomain: 'authme-29e0e.firebaseapp.com',
  projectId: 'authme-29e0e',
  storageBucket: 'authme-29e0e.appspot.com',
  messagingSenderId: '800774544053',
  appId: '1:800774544053:web:126dc4754ce6fb4ead7cfc'
};



// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

const app = initializeApp(firebaseConfig);