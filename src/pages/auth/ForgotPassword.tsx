import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/otp-verification");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-6">
        <p className="text-sm text-gray-500">
          لديك حساب بالفعل؟{" "}
          <Link
            to="/login"
            className="text-[#2b2196] font-medium hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
        <Link to="/" className="flex items-center gap-2">
          <span className="text-[#2b2196] font-bold text-xl">زفيق</span>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2b2196, #00c8c8)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
        <div className="w-full max-w-md">
          {/* Lock refresh icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #e8f4ff, #d0e8ff)",
              }}
            >
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect
                  x="6"
                  y="17"
                  width="26"
                  height="18"
                  rx="3"
                  fill="#2b2196"
                  fillOpacity="0.15"
                  stroke="#2b2196"
                  strokeWidth="2"
                />
                <path
                  d="M12 17V12a7 7 0 0114 0v5"
                  stroke="#2b2196"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="19"
                  cy="25"
                  r="3"
                  fill="#2b2196"
                  fillOpacity="0.6"
                />
                <path
                  d="M27 8 a9 9 0 1 1-4-3"
                  stroke="#00c8c8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <polyline
                  points="27,4 27,8 23,8"
                  stroke="#00c8c8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            هل نسيت كلمة المرور؟
          </h1>
          <p className="text-gray-500 text-sm text-center mb-8">
            سيتم إرسال رمز إلى بريدك الإلكتروني لإعادة تعيين كلمة المرور
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#2b2196] transition placeholder-gray-400"
                />
                <svg
                  className="absolute left-3 top-3.5"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold text-sm transition hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #00c8c8, #00b0b0)" }}
            >
              تأكيد
            </button>
          </form>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 pb-6">
        تم الإنشاء بواسطة فريق رفيق •{" "}
        <a href="#" className="text-[#2b2196] hover:underline">
          تواصل معنا
        </a>
      </p>
    </div>
  );
};

export default ForgotPassword;
