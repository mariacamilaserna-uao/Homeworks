import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAgZI3-cgok9fK3nmkc2-zj8XSAeNP68cI',
  authDomain: 'parcialdos-6ec11.firebaseapp.com',
  databaseURL: 'https://parcialdos-6ec11-default-rtdb.firebaseio.com',
  projectId: 'parcialdos-6ec11',
  storageBucket: 'parcialdos-6ec11.firebasestorage.app',
  messagingSenderId: '681209229953',
  appId: '1:681209229953:web:f23df07244dad95d841380',
  measurementId: 'G-BP2Y2GGVVF',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const analytics = getAnalytics(app)

export default app
