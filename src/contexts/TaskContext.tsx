import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  Timestamp
} from 'firebase/firestore';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => Promise<void>;
  updateTask: (id: string, title: string, description: string, completed: boolean) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
  currentUser: User | null;
}

export function TaskProvider({ children, currentUser }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksList: Task[] = snapshot.docs.map(docItem => ({
        id: docItem.id,
        title: docItem.data().title,
        description: docItem.data().description,
        completed: docItem.data().completed,
        userId: docItem.data().userId,
        createdAt: docItem.data().createdAt?.toDate() || new Date()
      }));
      setTasks(tasksList);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  const addTask = async (title: string, description: string) => {
    if (!currentUser) return;

    await addDoc(collection(db, 'tasks'), {
      title,
      description,
      completed: false,
      userId: currentUser.uid,
      createdAt: Timestamp.now()
    });
  };

  const updateTask = async (id: string, title: string, description: string, completed: boolean) => {
    await updateDoc(doc(db, 'tasks', id), {
      title,
      description,
      completed
    });
  };

  const toggleTask = async (id: string, completed: boolean) => {
    await updateDoc(doc(db, 'tasks', id), {
      completed: !completed
    });
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  }
  return context;
}
