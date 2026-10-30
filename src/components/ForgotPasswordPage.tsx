import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  KeyRound,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
  Check
} from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword, resetPassword, navigateTo, language, t } = useAuth();

  const [step, setStep] = useState<1 | 2>(1);
  const [identifier, setIdentifier] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [demoOtpNotice, setDemoOtpNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculation
  const isStrongEnough = newPassword.length >= 6;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setDemoOtpNotice(null);

    if (!identifier.trim()) {
      setErrorMessage(
        language === 'te'
          ? 'దయచేసి రిజిస్టర్డ్ మొబైల్ లేదా ఈమెయిల్ నమోదు చేయండి'
          : 'Please enter your registered mobile number or email'
      );
      return;
    }

    setIsSubmitting(true);
    const result = await forgotPassword(identifier.trim());
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Account not found. Please verify identifier.');
    } else {
      if (result.demoOtp) {
        setDemoOtpNotice(result.demoOtp);
        setOtpCode(result.demoOtp); // autofill for convenient testing
      }
      setStep(2);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setErrorMessage(
        language === 'te' ? 'దయచేసి సరైన 6-అంకెల OTP కోడ్ నమోదు చేయండి' : 'Please enter the 6-digit OTP code'
      );
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage(
        language === 'te' ? 'కొత్త పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి' : 'New password must be at least 6 characters'
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage(
        language === 'te' ? 'కొత్త పాస్‌వర్డ్‌లు సరిపోలడం లేదు' : 'New passwords do not match'
      );
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword(identifier.trim(), otpCode.trim(), newPassword);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to reset password. OTP may have expired.');
    } else {
      setSuccessMessage(
        language === 'te'
          ? 'పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది! లాగిన్ పేజీకి వెళ్తున్నాము...'
          : 'Password reset successfully! Redirecting to login page...'
      );
      setTimeout(() => {
        navigateTo('login');
      }, 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-[#071d15]">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1920&q=80"
          alt="Agriculture backdrop"
          className="w-full h-full object-cover opacity-15 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051810] via-[#062319]/90 to-[#071d15]/80" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Card */}
        <div className="rounded-3xl bg-[#092b1f]/90 backdrop-blur-xl border border-emerald-500/30 p-8 shadow-2xl shadow-emerald-950/80">
          
          <div className="text-center mb-6">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/40 mb-3">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {t.forgotTitle}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {t.forgotSubtitle}
            </p>
          </div>

          {/* Error & Success Alerts */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Interactive OTP Demo Notification Banner */}
          {demoOtpNotice && (
            <div className="mb-5 p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs space-y-1 backdrop-blur-sm animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Check className="w-4 h-4" />
                <span>Verification OTP Generated</span>
              </div>
              <p className="text-[11px] text-amber-100">
                A 6-digit code has been generated in the database:
              </p>
              <div className="text-base font-mono font-extrabold text-white tracking-widest bg-amber-950/60 p-1.5 rounded text-center border border-amber-600/50">
                {demoOtpNotice}
              </div>
            </div>
          )}

          {/* STEP 1: Enter Identifier */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.forgotIdentifierLabel}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 9876543210 or farmer@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 border border-emerald-300/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>{t.loading}</span>
                ) : (
                  <>
                    <span>{t.forgotSendOtpBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Enter OTP & New Password */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4 animate-fadeIn">
              {/* OTP Field */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.forgotOtpLabel}
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-Digit OTP"
                  className="w-full px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white text-center font-mono tracking-widest text-base focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  maxLength={6}
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.forgotNewPasswordLabel}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-emerald-300"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.forgotConfirmNewPasswordLabel}
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 border border-emerald-300/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>{t.loading}</span>
                ) : (
                  <>
                    <span>{t.forgotResetBtn}</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-center text-xs text-slate-400 hover:text-emerald-300 pt-1"
              >
                Change Mobile / Email
              </button>
            </form>
          )}

          {/* Return to Login Link */}
          <div className="mt-6 text-center text-xs">
            <button
              onClick={() => navigateTo('login')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline decoration-emerald-500/40"
            >
              {t.forgotBackToLogin}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
