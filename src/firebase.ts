import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, runTransaction } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC10kTHmtj5hGMRe_xxnu6i3u4RtEqKHdY",
  authDomain: "manhghephonviet-38937.firebaseapp.com",
  projectId: "manhghephonviet-38937",
  storageBucket: "manhghephonviet-38937.firebasestorage.app",
  messagingSenderId: "455606775255",
  appId: "1:455606775255:web:398e1d87d273df69ddef92",
  measurementId: "G-FFDH9Z8N83",
  databaseURL: "https://manhghephonviet-38937-default-rtdb.firebaseio.com"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo và export Realtime Database
export const db = getDatabase(app);

// Export các hàm thao tác dữ liệu để gọi ở component
export { ref, onValue, set, push, runTransaction };