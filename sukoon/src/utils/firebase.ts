import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3XDlhfdiyWIWL9xY9MvHI_bV7b3ea5sU",
  authDomain: "sukoon-d2753.firebaseapp.com",
  projectId: "sukoon-d2753",
  storageBucket: "sukoon-d2753.firebasestorage.app",
  messagingSenderId: "116683608516",
  appId: "1:116683608516:web:1293540321614f1a8f9491",
  measurementId: "G-XXZHCGHWYG"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
