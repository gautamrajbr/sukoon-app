import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "sukoon-mock.firebaseapp.com",
  projectId: "sukoon-mock",
  storageBucket: "sukoon-mock.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
