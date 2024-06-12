import React, { useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
  }
  
  export const UserContext = React.createContext<UserContextType | undefined>(undefined);
  
  export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };
  
  const USER_STORAGE_KEY = 'user_data';
  
  export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);
  
    const loadUserFromStorage = async () => {
        try {
          const userDataString = await AsyncStorage.getItem(USER_STORAGE_KEY);
          if (userDataString) {
            const userData: User = JSON.parse(userDataString);
            setUserState(userData);
          }
        } catch (error) {
          console.error('Failed to load user data from storage:', error);
        }
      };

    useEffect(() => {
      loadUserFromStorage();
    }, []);
  
    const setUser = async (user: User | null) => {
      setUserState(user);
      try {
        if (user) {
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to save user data to storage:', error);
      }
    };
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
