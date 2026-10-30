import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, navigateTo, language, setLanguage, t, protectedNotice } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage(language === 'te' ? 'దయచేసి మొబైల్ నంబర్ లేదా ఈమెయిల్ నమోదు చేయండి' : 'Please enter your Mobile Number or Email');
      return;
    }

    if (!password) {
      setErrorMessage(language === 'te' ? 'దయచేసి మీ పాస్‌వర్డ్ నమోదు చేయండి' : 'Please enter your password');
      return;
    }

    setIsSubmitting(true);
    const result = await login(identifier, password, rememberMe);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Login failed. Please check credentials.');
    }
  };

  const handleFillDemo = () => {
    setIdentifier('9876543210');
    setPassword('Farmer@123');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-[#071d15]">
      
      {/* Background Agriculture Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1920&q=80"
          alt="Agriculture landscape"
          className="w-full h-full object-cover opacity-20 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051810] via-[#062319]/90 to-[#071d15]/80" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Language Pill Selector */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex items-center gap-1 bg-emerald-950/80 backdrop-blur-md p-1 rounded-lg border border-emerald-800/40 text-xs">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                language === 'en' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                language === 'te' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>

        {/* Protected Notice if redirected from guarded route */}
        {protectedNotice && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5 backdrop-blur-md">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{protectedNotice}</span>
          </div>
        )}

        {/* Glassmorphism Login Card */}
        <div className="rounded-3xl bg-[#092b1f]/85 backdrop-blur-xl border border-emerald-500/30 p-8 shadow-2xl shadow-emerald-950/70">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/40 mb-3">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t.loginTitle}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {t.loginSubtitle}
            </p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Mobile / Email Field */}
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                {t.loginIdentifierLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={t.loginIdentifierPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-emerald-200">
                  {t.loginPasswordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => navigateTo('forgot_password')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  {t.loginForgotPassword}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.loginPasswordPlaceholder}
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-emerald-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-emerald-700 bg-emerald-950 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
                <span className="text-xs text-slate-300">{t.loginRememberMe}</span>
              </label>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>JWT Secure</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 border border-emerald-300/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>{t.loading}</span>
              ) : (
                <>
                  <span>{t.loginSubmitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-5 pt-5 border-t border-emerald-900/60">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2 px-3 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/40 text-emerald-300 hover:text-emerald-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.loginDemoFillBtn}</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-1">
              Mobile: 9876543210 · Pass: Farmer@123
            </p>
          </div>

          {/* Register Redirect */}
          <div className="mt-6 text-center text-xs text-slate-300">
            <span>{t.loginNoAccount} </span>
            <button
              onClick={() => navigateTo('register')}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors ml-1 underline decoration-emerald-500/40"
            >
              {t.loginRegisterNow}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
