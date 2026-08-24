import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDpwbPiEGsEW5R5LQ8ohPlEZs5IxC_o4Ro",
  authDomain: "aquasolar-iot.firebaseapp.com",
  databaseURL: "https://aquasolar-iot-default-rtdb.firebaseio.com",
  projectId: "aquasolar-iot",
  storageBucket: "aquasolar-iot.firebasestorage.app",
  messagingSenderId: "775813222850",
  appId: "1:775813222850:web:6b8b6060cdbe4f899f865b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
