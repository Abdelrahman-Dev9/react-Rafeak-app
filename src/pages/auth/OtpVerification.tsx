import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
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
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #e8f4ff, #d0e8ff)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M18 3 L32 10 L32 22 Q32 31 18 34 Q4 31 4 22 L4 10 Z"
                  fill="#2b2196"
                  fillOpacity="0.15"
                  stroke="#2b2196"
                  strokeWidth="2"
                />
                <path
                  d="M11 18 l5 5 l9-9"
                  stroke="#2b2196"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            التحقق من الرمز
          </h1>
          <p className="text-gray-500 text-sm text-center mb-8">
            أدخل الرمز المكون من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP inputs — reversed for RTL display left-to-right visually */}
            <div className="flex gap-3 justify-center" dir="ltr">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-11 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg outline-none focus:border-[#2b2196] transition"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold text-sm transition hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #00c8c8, #00b0b0)" }}
            >
              تأكيد
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            لم يصلك الرمز؟{" "}
            <button className="text-[#2b2196] font-medium hover:underline">
              إعادة الإرسال
            </button>
          </p>
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

export default OtpVerification;
