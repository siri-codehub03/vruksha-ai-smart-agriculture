import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES_AND_DISTRICTS } from '../data/mockAgricultureData';
import {
  Sprout,
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Globe,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, navigateTo, language, setLanguage, t } = useAuth();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedState, setSelectedState] = useState('Andhra Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Guntur');
  const [village, setVillage] = useState('');
  const [prefLang, setPrefLang] = useState<'en' | 'te'>('en');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available districts for chosen state
  const availableDistricts = INDIAN_STATES_AND_DISTRICTS[selectedState] || ['District'];

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    const districts = INDIAN_STATES_AND_DISTRICTS[newState] || [];
    if (districts.length > 0) {
      setSelectedDistrict(districts[0]);
    }
  };

  // Password Strength Meter Calculation
  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-700' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 25, label: t.pwdWeak, color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: t.pwdFair, color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: t.pwdGood, color: 'bg-teal-500' };
    return { score: 100, label: t.pwdStrong, color: 'bg-emerald-500' };
  };

  const pwdStrength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage(language === 'te' ? 'దయచేసి మీ పూర్తి పేరు నమోదు చేయండి' : 'Please enter your Full Name');
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setErrorMessage(
        language === 'te'
          ? 'దయచేసి సరైన 10-అంకెల భారతీయ మొబైల్ నంబర్ నమోదు చేయండి (6, 7, 8, 9 తో మొదలయ్యేది)'
          : 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage(
        language === 'te' ? 'దయచేసి సరైన ఈమెయిల్ చిరునామా నమోదు చేయండి' : 'Please enter a valid email address'
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        language === 'te' ? 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి' : 'Password must be at least 6 characters long'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        language === 'te' ? 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు' : 'Passwords do not match. Please verify.'
      );
      return;
    }

    if (!village.trim()) {
      setErrorMessage(
        language === 'te' ? 'దయచేసి మీ గ్రామం లేదా మండలం నమోదు చేయండి' : 'Please enter your Village or Mandal name'
      );
      return;
    }

    if (!termsAccepted) {
      setErrorMessage(
        language === 'te'
          ? 'దయచేసి నిబంధనలు మరియు షరతులను అంగీకరించండి'
          : 'Please accept the Terms and Conditions to proceed'
      );
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      full_name: fullName,
      mobile: cleanMobile,
      email,
      password,
      confirm_password: confirmPassword,
      state: selectedState,
      district: selectedDistrict,
      village: village.trim(),
      preferred_language: prefLang,
      terms_accepted: true
    });
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Registration failed. Please check information.');
    } else {
      setSuccessMessage(
        language === 'te'
          ? 'ఖాతా విజయవంతంగా సృష్టించబడింది! డ్యాష్‌బోర్డ్‌కు వెళ్తున్నాము...'
          : 'Farmer registration completed successfully! Redirecting to dashboard...'
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-[#071d15]">
      
      {/* Background Agriculture Landscape */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80"
          alt="Agriculture fields"
          className="w-full h-full object-cover opacity-20 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051810] via-[#062319]/90 to-[#071d15]/80" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex items-center gap-1 bg-emerald-950/80 backdrop-blur-md p-1 rounded-lg border border-emerald-800/40 text-xs">
            <button
              onClick={() => { setLanguage('en'); setPrefLang('en'); }}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                language === 'en' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => { setLanguage('te'); setPrefLang('te'); }}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                language === 'te' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              తెలుగు
            </button>
          </div>
        </div>

        {/* Modern Glassmorphism Registration Card */}
        <div className="rounded-3xl bg-[#092b1f]/90 backdrop-blur-xl border border-emerald-500/30 p-6 sm:p-10 shadow-2xl shadow-emerald-950/80">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/40 mb-3">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.registerTitle}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
              {t.registerSubtitle}
            </p>
          </div>

          {/* Error & Success Alerts */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Grid Row 1: Full Name & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.regFullName} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.regFullNamePlaceholder}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.regMobile} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder={t.regMobilePlaceholder}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                {t.regEmail} <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.regEmailPlaceholder}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                  required
                />
              </div>
            </div>

            {/* Grid Row 2: Create Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Create Password */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.regPassword} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6-8 chars"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-emerald-300"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400">Strength:</span>
                      <span className="font-semibold text-emerald-300">{pwdStrength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-emerald-950 rounded-full overflow-hidden border border-emerald-900/60">
                      <div
                        className={`h-full transition-all duration-300 ${pwdStrength.color}`}
                        style={{ width: `${pwdStrength.score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.regConfirmPassword} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-emerald-950/60 border text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-1 transition-all ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-emerald-800/60 focus:border-emerald-400 focus:ring-emerald-400'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-emerald-300"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-[10px] text-rose-400 mt-1">Passwords do not match</p>
                )}
              </div>

            </div>

            {/* Grid Row 3: State & District Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* State */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.regState} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all appearance-none cursor-pointer"
                  >
                    {Object.keys(INDIAN_STATES_AND_DISTRICTS).map((st) => (
                      <option key={st} value={st} className="bg-[#092b1f] text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.regDistrict} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all appearance-none cursor-pointer"
                  >
                    {availableDistricts.map((dist) => (
                      <option key={dist} value={dist} className="bg-[#092b1f] text-white">
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Grid Row 4: Village & Preferred Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Village */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.regVillage} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder={t.regVillagePlaceholder}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                  {t.regLanguage}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <select
                    value={prefLang}
                    onChange={(e) => setPrefLang(e.target.value as 'en' | 'te')}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all appearance-none cursor-pointer"
                  >
                    <option value="te" className="bg-[#092b1f] text-white">తెలుగు (Telugu - Recommended)</option>
                    <option value="en" className="bg-[#092b1f] text-white">English</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Terms and Conditions */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-emerald-700 bg-emerald-950 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
                <span className="text-xs text-slate-300">
                  {t.regTermsAccept}{' '}
                  <button
                    type="button"
                    onClick={() => setTermsModalOpen(true)}
                    className="text-emerald-400 hover:text-emerald-300 underline font-semibold ml-1"
                  >
                    {language === 'te' ? 'నిబంధనలు చదవండి' : 'Read Terms'}
                  </button>
                </span>
              </label>
            </div>

            {/* Submit Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 border border-emerald-300/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>{t.loading}</span>
              ) : (
                <>
                  <span>{t.regSubmitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Already have an account redirect to login */}
          <div className="mt-6 text-center text-xs text-slate-300">
            <span>{t.regAlreadyHaveAccount} </span>
            <button
              onClick={() => navigateTo('login')}
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors ml-1 underline decoration-emerald-500/40"
            >
              {t.regLoginLink}
            </button>
          </div>

        </div>

      </div>

      {/* Terms and Conditions Modal */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#092b1f] border border-emerald-600/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  {language === 'te' ? 'వ్యవసాయ సలహా సేవా నిబంధనలు' : 'Terms & Agricultural Advisory Conditions'}
                </h3>
              </div>
              <button
                onClick={() => setTermsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto pr-2">
              <p>
                1. <strong>Agronomic Guidance:</strong> Recommendations provided by VRUKSHA AI are based on micro-climatic satellite feeds, soil testing indicators, and standard ICAR agronomic research.
              </p>
              <p>
                2. <strong>Safe Chemical Usage:</strong> All chemical dosages follow Central Insecticides Board & Registration Committee (CIBRC) standards. Always verify local pesticide labels before field application.
              </p>
              <p>
                3. <strong>Farmer Privacy:</strong> Your personal contact details, land size, and soil parameters are strictly safeguarded in secure encrypted SQLite database storage.
              </p>
            </div>
            <button
              onClick={() => {
                setTermsAccepted(true);
                setTermsModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              {language === 'te' ? 'అంగీకరిస్తున్నాను' : 'I Understand & Accept'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
