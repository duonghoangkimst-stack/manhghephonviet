import { useState, type FormEvent } from 'react';
import { TabType, UserProfile } from '../types';
import { INITIAL_USER } from '../data/mockData';

interface LoginViewProps {
  setActiveTab: (tab: TabType) => void;
  user: UserProfile | null;
  onLogin: (u: UserProfile) => void;
  onLogout: () => void;
}

interface RegisteredUser {
  name: string;
  email: string;
  password?: string;
  profile: UserProfile;
}

// Thông số mặc định chuẩn cho TÀI KHOẢN MỚI
const NEW_USER_BASE_PROFILE: UserProfile = {
  ...INITIAL_USER,
  level: 1,
  xp: 0,
  starsCount: 50,  // Nhận 50 sao khi đăng ký mới
  lotusPoints: 0,  // 0 hoa sen
  title: 'Người Giữ Sử',
};

export default function LoginView({
  setActiveTab,
  user,
  onLogin,
  onLogout
}: LoginViewProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const getRegisteredUsers = (): RegisteredUser[] => {
    const saved = localStorage.getItem('registered_users');
    return saved ? JSON.parse(saved) : [];
  };

  const validatePassword = (pass: string) => {
    if (pass.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự!';
    if (!/\d/.test(pass)) return 'Mật khẩu phải chứa ít nhất 1 chữ số!';
    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const passError = validatePassword(password);
    if (passError) {
      setErrorMessage(passError);
      return;
    }

    const registeredUsers = getRegisteredUsers();

    if (authMode === 'register') {
      // 1. XỬ LÝ ĐĂNG KÝ
      const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        setErrorMessage('Email này đã được đăng ký! Vui lòng chuyển sang Đăng nhập.');
        return;
      }

      const newUserProfile: UserProfile = {
        ...NEW_USER_BASE_PROFILE,
        name: name.trim() || 'Người Giữ Sử',
        email: email.trim(),
      };

      registeredUsers.push({
        name: name.trim(),
        email: email.trim(),
        password,
        profile: newUserProfile,
      });
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));

      onLogin(newUserProfile);
      setSuccessMessage('🎉 Đăng ký thành công! Bạn nhận được +50 Điểm Sao.');
      setTimeout(() => setSuccessMessage(''), 4000);

    } else {
      // 2. XỬ LÝ ĐĂNG NHẬP
      const foundUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        setErrorMessage('Tài khoản chưa tồn tại hoặc mật khẩu không chính xác!');
        return;
      }

      onLogin(foundUser.profile);
      setSuccessMessage('🎉 Đăng nhập thành công!');
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  return (
    <div className="w-full flex-grow bg-[#FDFBF7] py-16 px-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#FFF8F6] rounded-3xl border-2 border-[#C5B358] shadow-2xl p-8 relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-[#570000]">
          <span className="material-symbols-outlined text-[200px]">temple_buddhist</span>
        </div>

        {/* Back to Home Button */}
        <div className="mb-6 flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              setActiveTab('trangchu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#570000] flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Về Trang Chủ</span>
          </button>

          <span className="text-[10px] bg-[#FFE9E6] text-[#570000] font-bold px-2.5 py-1 rounded-full uppercase">
            Hồ sơ Hồn Việt
          </span>
        </div>

        {user ? (
          /* Logged-in Profile View */
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="relative inline-block">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#C5B358] shadow-lg mx-auto"
              />
              <span className="absolute bottom-0 right-0 bg-[#570000] text-[#D4AF37] text-xs font-bold px-2 py-0.5 rounded-full border border-[#C5B358]">
                Lv.{user.level || 1}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#570000]">{user.name}</h3>
              <p className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                {user.title || 'Người Giữ Sử'}
              </p>
              <p className="text-[11px] text-stone-500 text-center">{user.email}</p>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-2xl border border-[#C5B358]/50 text-center">
              <div>
                <span className="text-base font-bold text-[#570000]">{user.xp || 0}</span>
                <p className="text-[9px] text-stone-500 uppercase font-bold">Điểm XP</p>
              </div>
              <div>
                <span className="text-base font-bold text-[#D4AF37]">{user.starsCount || 0}</span>
                <p className="text-[9px] text-stone-500 uppercase font-bold">Điểm Sao</p>
              </div>
              <div>
                <span className="text-base font-bold text-[#007A33]">{user.lotusPoints || 0}</span>
                <p className="text-[9px] text-stone-500 uppercase font-bold">Hoa Sen</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('trochoi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#570000] hover:bg-[#800000] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Tiếp tục khám phá
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="w-full bg-transparent border border-stone-300 text-stone-600 hover:bg-stone-100 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          /* Login / Register Form */
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-[#570000] uppercase mb-1">
                {authMode === 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'}
              </h2>
              <p className="text-xs text-stone-500">
                {authMode === 'login'
                  ? 'Đăng nhập để lưu tiến trình khám phá'
                  : 'Trở thành thành viên mới nhận ngay 50 Điểm Sao'}
              </p>
            </div>

            {/* Tab switch */}
            <div className="flex bg-[#FFE9E6] p-1 rounded-full">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                  authMode === 'login' ? 'bg-[#570000] text-white shadow' : 'text-[#570000]'
                }`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                  authMode === 'register' ? 'bg-[#570000] text-white shadow' : 'text-[#570000]'
                }`}
              >
                Đăng ký
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-xl text-center font-bold">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-100 border border-emerald-500 text-emerald-800 text-xs rounded-xl text-center font-bold animate-fadeIn">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-[#570000] mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hoàng Kim"
                    className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-[#570000] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hoangkim@gmail.com"
                  className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#570000] mb-1">
                  Mật khẩu (ít nhất 6 ký tự & 1 số)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-white border border-[#C5B358] rounded-xl text-xs text-[#261816] focus:outline-none focus:border-[#570000]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#570000] hover:bg-[#800000] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                >
                  {authMode === 'login' ? 'Đăng Nhập Ngay' : 'Tạo Tài Khoản Mới'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}