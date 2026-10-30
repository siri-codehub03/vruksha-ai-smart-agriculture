import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Language, ActivePage } from '../types';
import { translations } from '../i18n/translations';

interface AuthContextType {
  user: User | null;
  token: string | null;
  language: Language;
  activePage: ActivePage;
  isLoading: boolean;
  t: typeof translations.en;
  setLanguage: (lang: Language) => void;
  navigateTo: (page: ActivePage) => void;
  login: (identifier: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (data: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (identifier: string) => Promise<{ success: boolean; message?: string; demoOtp?: string; error?: string }>;
  resetPassword: (identifier: string, otpCode: string, newPassword: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; user?: User; error?: string }>;
  protectedNotice: string | null;
  clearProtectedNotice: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('vruksha_token'));
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('vruksha_lang') as Language) || 'en';
  });
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [protectedNotice, setProtectedNotice] = useState<string | null>(null);

  const t = translations[language] || translations.en;

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vruksha_lang', lang);
  };

  const clearProtectedNotice = () => setProtectedNotice(null);

  // Navigate with Route Protection
  const navigateTo = (page: ActivePage) => {
    const publicPages: ActivePage[] = ['landing', 'login', 'register', 'forgot_password'];
    
    // If attempting to access an internal agricultural page without being logged in
    if (!publicPages.includes(page) && !user) {
      setProtectedNotice(t.authRequiredNotice);
      setActivePage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    clearProtectedNotice();
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check current session on mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('vruksha_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/auth/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
            setToken(storedToken);
            if (data.user.preferred_language) {
              setLanguageState(data.user.preferred_language);
            }
          } else {
            localStorage.removeItem('vruksha_token');
            setToken(null);
            setUser(null);
          }
        } else {
          localStorage.removeItem('vruksha_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.warn('Session verification failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (identifier: string, password: string, rememberMe: boolean = false) => {
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password, remember_me: rememberMe })
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Login failed. Please check your credentials.' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('vruksha_token', data.token);

      if (data.user.preferred_language) {
        setLanguage(data.user.preferred_language);
      }

      clearProtectedNotice();
      setActivePage('dashboard');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during login' };
    }
  };

  const register = async (formData: any) => {
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('vruksha_token', data.token);

      if (data.user.preferred_language) {
        setLanguage(data.user.preferred_language);
      }

      clearProtectedNotice();
      setActivePage('dashboard');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error during registration' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout request failed:', err);
    } finally {
      localStorage.removeItem('vruksha_token');
      setUser(null);
      setToken(null);
      setActivePage('landing');
    }
  };

  const forgotPassword = async (identifier: string) => {
    try {
      const res = await fetch('/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to send OTP' };
      }
      return { success: true, message: data.message, demoOtp: data.demoOtp };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const resetPassword = async (identifier: string, otpCode: string, newPassword: string) => {
    try {
      const res = await fetch('/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          otp_code: otpCode,
          new_password: newPassword,
          confirm_new_password: newPassword
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Password reset failed' };
      }
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!token) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch('/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to update profile' };
      }
      setUser(data.user);
      if (data.user.preferred_language) {
        setLanguage(data.user.preferred_language);
      }
      return { success: true, user: data.user };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        language,
        activePage,
        isLoading,
        t,
        setLanguage,
        navigateTo,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        protectedNotice,
        clearProtectedNotice
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
