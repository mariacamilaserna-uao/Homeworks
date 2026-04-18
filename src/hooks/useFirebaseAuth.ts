import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/config';

export function useFirebaseAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const register = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, {
        displayName: displayName
      });
      return result.user;
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      const errorMessages: { [key: string]: string } = {
        'auth/email-already-in-use': 'Este email ya esta registrado',
        'auth/invalid-email': 'Email no valido',
        'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres',
        'auth/operation-not-allowed': 'Operacion no permitida',
      };
      setError(errorMessages[errorObj.code || ''] || 'Error en el registro');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      const errorMessages: { [key: string]: string } = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'Contrasena incorrecta',
        'auth/invalid-email': 'Email no valido',
        'auth/user-disabled': 'Usuario deshabilitado',
      };
      setError(errorMessages[errorObj.code || ''] || 'Error en el inicio de sesion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError('');
    try {
      await signOut(auth);
    } catch {
      setError('Error al cerrar sesion');
      throw new Error('Error al cerrar sesion');
    } finally {
      setLoading(false);
    }
  };

  return { register, login, logout, loading, error, setError };
}
