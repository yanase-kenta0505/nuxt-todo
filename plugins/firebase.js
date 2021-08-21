import firebase from 'firebase'
import 'firebase/auth';


const config = {
  apiKey:process.env.FIREBASE_API_KEY,
  authDomain:process.env.FIREBASE_AUTHDOMAIN,
  projectId:process.env.FIREBASE_PROJECT_ID,
  storageBucket:process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_IDFI,
  appId:process.env.FIREBASE_APP_ID,
  measurementId:process.env.FIREBASE_MEASURMENT_ID
}

console.log(config)

if(!firebase.apps.length){
  firebase.initializeApp(config)
}

console.log(firebase)
export default firebase
export const auth = firebase.auth();
