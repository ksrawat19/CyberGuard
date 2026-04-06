import { useMemo, useState } from 'react';
import {
  FaShieldAlt,
  FaKey,
  FaChartLine,
  FaLightbulb,
  FaMagic,
  FaDice,
  FaComments,
  FaCopy,
  FaSync,
  FaFont,
  FaTextHeight,
  FaHashtag,
  FaAt,
  FaMicroscope,
  FaRuler,
  FaShapes,
  FaClock,
  FaStar,
  FaFingerprint,
  FaRulerHorizontal,
  FaPuzzlePiece,
  FaUserSecret,
  FaSyncAlt,
  FaMobileAlt,
  FaBook,
  FaEye,
  FaEyeSlash,
  FaCheckCircle
} from 'react-icons/fa';

const tips = [
  { icon: FaFingerprint, title: 'Use Unique Passwords', text: 'Never reuse passwords across multiple accounts. Each account should have its own unique password.' },
  { icon: FaRulerHorizontal, title: 'Length Matters', text: 'Longer passwords are exponentially harder to crack. Aim for at least 12-16 characters.' },
  { icon: FaPuzzlePiece, title: 'Mix Character Types', text: 'Combine uppercase, lowercase, numbers, and symbols for maximum strength.' },
  { icon: FaUserSecret, title: 'Avoid Personal Info', text: 'Do not use names, birthdays, or other personal information in your passwords.' },
  { icon: FaSyncAlt, title: 'Regular Updates', text: 'Change passwords regularly, especially for critical accounts like banking and email.' },
  { icon: FaMobileAlt, title: 'Enable Two-Factor Authentication', text: 'Use 2FA when possible for an extra layer of account protection.' }
];

function generatePronounceablePassword(length) {
  const consonants = 'bcdfghjklmnprstvwxyz';
  const vowels = 'aeiou';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*';

  let password = '';
  let useConsonant = Math.random() > 0.5;

  for (let i = 0; i < Math.max(length - 2, 1); i += 1) {
    password += useConsonant
      ? consonants[Math.floor(Math.random() * consonants.length)]
      : vowels[Math.floor(Math.random() * vowels.length)];
    useConsonant = !useConsonant;
  }

  password = password.charAt(0).toUpperCase() + password.slice(1);
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  return password;
}

function getStrengthData(password) {
  if (!password) {
    return {
      width: 0,
      text: 'Enter a password',
      color: 'bg-slate-700',
      labelColor: 'text-slate-400',
      types: 'None',
      score: 0,
      crackTime: 'Unknown'
    };
  }

  let score = 0;
  const types = [];

  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  if (password.length >= 20) score += 10;

  if (/[a-z]/.test(password)) { score += 10; types.push('lowercase'); }
  if (/[A-Z]/.test(password)) { score += 10; types.push('uppercase'); }
  if (/[0-9]/.test(password)) { score += 10; types.push('numbers'); }
  if (/[^a-zA-Z0-9]/.test(password)) { score += 20; types.push('symbols'); }

  let text = 'Weak';
  let color = 'bg-red-500';
  let labelColor = 'text-red-400';
  let crackTime = 'Days';

  if (score < 30) {
    text = 'Weak'; color = 'bg-red-500'; labelColor = 'text-red-400'; crackTime = 'Days';
  } else if (score < 50) {
    text = 'Fair'; color = 'bg-orange-500'; labelColor = 'text-orange-400'; crackTime = 'Months';
  } else if (score < 70) {
    text = 'Good'; color = 'bg-yellow-500'; labelColor = 'text-yellow-400'; crackTime = 'Years';
  } else if (score < 90) {
    text = 'Strong'; color = 'bg-sky-500'; labelColor = 'text-sky-400'; crackTime = 'Decades';
  } else {
    text = 'Very Strong'; color = 'bg-emerald-500'; labelColor = 'text-emerald-400'; crackTime = 'Centuries';
  }

  return { width: score, text, color, labelColor, types: types.length ? types.join(', ') : 'None', score, crackTime };
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [passwordMode, setPasswordMode] = useState('random');
  const [generatedPassword, setGeneratedPassword] = useState('Click Generate to create a password');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [analyzePassword, setAnalyzePassword] = useState('');
  const [leakedPassword, setLeakedPassword] = useState('');
  const [leakedResult, setLeakedResult] = useState(null);
  const [leakedLoading, setLeakedLoading] = useState(false);
  const [leakedError, setLeakedError] = useState('');
  const [showLeakedPassword, setShowLeakedPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const strength = useMemo(() => getStrengthData(analyzePassword), [analyzePassword]);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 2800);
  };

  const generatePassword = () => {
    if (passwordMode === 'pronounceable') {
      setGeneratedPassword(generatePronounceablePassword(length));
      return;
    }

    let charset = '';
    if (includeUppercase) charset += excludeAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += excludeAmbiguous ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += excludeAmbiguous ? '23456789' : '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      showToast('Please select at least one character type!', 'error');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setGeneratedPassword(password);
  };

  const copyPassword = async () => {
    if (generatedPassword === 'Click Generate to create a password') return;
    try {
      await navigator.clipboard.writeText(generatedPassword);
      showToast('Password copied to clipboard!');
    } catch {
      showToast('Unable to copy password.', 'error');
    }
  };

  const hashPassword = async (plainText) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plainText);
    const digest = await crypto.subtle.digest('SHA-1', data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  };

  const checkLeakedPassword = async () => {
    if (!leakedPassword) {
      setLeakedError('Please enter a password.');
      setLeakedResult(null);
      return;
    }

    setLeakedLoading(true);
    setLeakedError('');
    setLeakedResult(null);

    try {
      const hash = await hashPassword(leakedPassword);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await response.text();
      const match = text.split('\n').find((line) => line.startsWith(suffix));

      if (match) {
        const count = match.split(':')[1].trim();
        setLeakedResult(`⚠️ This password has been found ${count} times in data breaches.`);
      } else {
        setLeakedResult('✅ This password was NOT found in any known data breaches.');
      }
    } catch {
      setLeakedError('Failed to check password. Please try again.');
    } finally {
      setLeakedLoading(false);
    }
  };

  const toggleShowLeakedPassword = () => setShowLeakedPassword((prev) => !prev);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-700">
            <FaShieldAlt className="text-4xl text-sky-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">CyberGuard</h1>
          <p className="mt-3 text-slate-400 text-lg">Secure Password Generator & Analyzer</p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 bg-slate-900 border border-slate-800 rounded-3xl p-1.5">
          {[
            { label: 'Generator', icon: FaKey },
            { label: 'Analyzer', icon: FaMicroscope },
            { label: 'Leaked', icon: FaFingerprint },
            { label: 'Tips', icon: FaLightbulb }
          ].map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-8 py-4 rounded-3xl text-sm font-medium transition-all ${
                  activeTab === index 
                    ? 'bg-slate-800 text-white shadow-inner' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950'
                }`}
              >
                <Icon className="text-lg" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Generator Tab */}
        {activeTab === 0 && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                  <FaMagic className="text-2xl text-sky-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Password Generator</h2>
                  <p className="text-slate-400">Create strong, unique passwords instantly</p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-700 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  readOnly
                  value={generatedPassword}
                  className="flex-1 bg-transparent text-lg font-mono tracking-wider text-sky-300 outline-none"
                />
                <button
                  onClick={copyPassword}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-6 py-3 rounded-2xl font-medium transition"
                >
                  <FaCopy /> Copy
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Length */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Length</span>
                    <span className="font-mono text-xl text-sky-400">{length}</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>8</span><span>64</span>
                  </div>
                </div>

                {/* Mode */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                  <span className="font-medium block mb-4">Generation Mode</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setPasswordMode('random')}
                      className={`flex-1 py-3 rounded-2xl text-sm font-medium transition ${
                        passwordMode === 'random' 
                          ? 'bg-sky-600 text-white' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <FaDice className="inline mr-2" /> Random
                    </button>
                    <button
                      onClick={() => setPasswordMode('pronounceable')}
                      className={`flex-1 py-3 rounded-2xl text-sm font-medium transition ${
                        passwordMode === 'pronounceable' 
                          ? 'bg-sky-600 text-white' 
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <FaComments className="inline mr-2" /> Readable
                    </button>
                  </div>
                </div>
              </div>

              {/* Character Types */}
              <div className="mt-8">
                <p className="font-medium mb-4">Character Types</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Uppercase (A-Z)', checked: includeUppercase, setter: setIncludeUppercase },
                    { label: 'Lowercase (a-z)', checked: includeLowercase, setter: setIncludeLowercase },
                    { label: 'Numbers (0-9)', checked: includeNumbers, setter: setIncludeNumbers },
                    { label: 'Symbols (!@#$...)', checked: includeSymbols, setter: setIncludeSymbols },
                  ].map((opt) => (
                    <label key={opt.label} className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl px-5 py-4 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={opt.checked}
                        onChange={(e) => opt.setter(e.target.checked)}
                        className="h-5 w-5 accent-sky-500"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl px-5 py-4 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={excludeAmbiguous}
                      onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                      className="h-5 w-5 accent-sky-500"
                    />
                    <span>Exclude Ambiguous Characters (0 O l I)</span>
                  </label>
                </div>
              </div>

              <button
                onClick={generatePassword}
                className="mt-10 w-full bg-sky-600 hover:bg-sky-500 transition py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
              >
                <FaSync /> Generate Password
              </button>
            </div>
          </div>
        )}

        {/* Analyzer Tab */}
        {activeTab === 1 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                <FaMicroscope className="text-2xl text-sky-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Password Analyzer</h2>
                <p className="text-slate-400">Check the strength of your password</p>
              </div>
            </div>

            <input
              type="text"
              value={analyzePassword}
              onChange={(e) => setAnalyzePassword(e.target.value)}
              placeholder="Type or paste password here..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-6 py-5 text-lg font-mono outline-none focus:border-sky-600 mb-8"
            />

            {analyzePassword && (
              <>
                <div className="mb-8">
                  <div className="flex justify-between mb-3">
                    <span className="font-medium">Strength</span>
                    <span className={strength.labelColor}>{strength.text}</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.color} transition-all duration-500`} 
                      style={{ width: `${strength.width}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Length', value: `${analyzePassword.length} characters` },
                    { label: 'Types', value: strength.types },
                    { label: 'Crack Time', value: strength.crackTime },
                    { label: 'Score', value: `${strength.score}/100` }
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-5">
                      <p className="text-slate-400 text-sm mb-1">{item.label}</p>
                      <p className="font-medium text-lg">{item.value}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                <FaFingerprint className="text-2xl text-sky-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Leaked Password Check</h2>
                <p className="text-slate-400">Verify whether your password appears in known breaches</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto] mb-6">
              <input
                type={showLeakedPassword ? 'text' : 'password'}
                value={leakedPassword}
                onChange={(e) => setLeakedPassword(e.target.value)}
                placeholder="Enter password to check..."
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-6 py-5 text-lg font-mono outline-none focus:border-sky-600"
              />
              <button
                type="button"
                onClick={toggleShowLeakedPassword}
                className="rounded-2xl bg-slate-800 border border-slate-700 px-5 py-5 text-slate-300 hover:bg-slate-700 transition"
              >
                {showLeakedPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
              </button>
            </div>

            <button
              type="button"
              onClick={checkLeakedPassword}
              className="w-full bg-sky-600 hover:bg-sky-500 transition py-4 rounded-2xl font-semibold text-white mb-6"
            >
              {leakedLoading ? 'Checking...' : 'Check Password'}
            </button>

            {leakedError && <p className="text-red-400 mb-4">{leakedError}</p>}
            {leakedResult && <p className="text-slate-200 whitespace-pre-line">{leakedResult}</p>}
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 3 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                <FaLightbulb className="text-2xl text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Security Tips</h2>
                <p className="text-slate-400">Best practices to keep your accounts safe</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="bg-slate-950 border border-slate-800 rounded-3xl p-7 hover:border-slate-600 transition">
                    <div className="mb-5 text-3xl text-slate-400">
                      <Icon />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{tip.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{tip.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* <footer className="text-center text-slate-500 mt-16 text-sm">
          © 2026 CyberGuard • Professional Password Security
        </footer> */}
      </div>

      {/* Toast */}
      {toast.visible && (
        <div className="fixed bottom-8 right-8 bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-xl">
          <FaCheckCircle className={toast.type === 'error' ? 'text-red-400' : 'text-emerald-400'} />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}