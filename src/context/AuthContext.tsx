import {
  createContext,
  useState,
  type ReactNode,
  useContext,
  useEffect,
} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, database } from '../services/firebase'
import { ref, set, get } from 'firebase/database'
import { type Usuario } from '../types'

interface AuthContextType {
  usuarioActual: Usuario | null
  login: (correo: string, contrasena: string) => Promise<void>
  registro: (correo: string, nombre: string, contrasena: string) => Promise<void>
  logout: () => Promise<void>
  estaAutenticado: boolean
  cargando: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const usuarioRef = ref(database, `usuarios/${firebaseUser.uid}`)
        const snapshot = await get(usuarioRef)
        if (snapshot.exists()) {
          setUsuarioActual(snapshot.val())
        }
      } else {
        setUsuarioActual(null)
      }
      setCargando(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (correo: string, contrasena: string) => {
    if (!correo.includes('@')) throw new Error('Correo invalido')
    if (contrasena.length < 6) throw new Error('Contrasena muy corta')

    const usuarioCredential = await signInWithEmailAndPassword(auth, correo, contrasena)
    const firebaseUser = usuarioCredential.user

    const usuarioRef = ref(database, `usuarios/${firebaseUser.uid}`)
    const snapshot = await get(usuarioRef)
    if (snapshot.exists()) {
      setUsuarioActual(snapshot.val())
    }
  }

  const registro = async (correo: string, nombre: string, contrasena: string) => {
    if (!correo.includes('@')) throw new Error('Correo invalido')
    if (!nombre.trim()) throw new Error('Nombre requerido')
    if (contrasena.length < 6) throw new Error('Contrasena muy corta')

    const usuarioCredential = await createUserWithEmailAndPassword(auth, correo, contrasena)
    const firebaseUser = usuarioCredential.user

    const usuario: Usuario = {
      id: firebaseUser.uid,
      correo,
      nombre,
    }

    const usuarioRef = ref(database, `usuarios/${firebaseUser.uid}`)
    await set(usuarioRef, usuario)
    setUsuarioActual(usuario)
  }

  const logout = async () => {
    await signOut(auth)
    setUsuarioActual(null)
  }

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        login,
        registro,
        logout,
        estaAutenticado: usuarioActual !== null,
        cargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const contexto = useContext(AuthContext)
  if (!contexto) {
    throw new Error('useAuth tiene que estar dentro de AuthProvider')
  }
  return contexto
}
