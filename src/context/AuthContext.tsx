import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/services/firebase';
import { User } from 'firebase/auth';
import { AuthProviderProps } from './types';

interface AuthContextType {
    currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Limpa a inscrição ao desmontar
    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
  };
