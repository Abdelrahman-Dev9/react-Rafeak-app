import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import studentImage from "../../assets/studentImage.png";
import { login } from "../../store/authSlice";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 🔥 Zod Schema
const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((res) => setTimeout(res, 500));

    dispatch(
      login({
        email: data.email,
        name: "مستخدم",
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* FORM */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-8 py-6">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <span className="text-[#418FBF] font-bold text-2xl">رفيق</span>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #2b2196, #00c8c8)",
              }}
            >
              <img src={logo} alt="logo" className="w-6 h-6" />
            </div>
          </Link>
        </div>

        {/* CENTER */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-[#418FBF] mb-2">
              مرحبًا بعودتك
            </h1>

            <p className="text-center text-gray-600 mb-8 mt-5">
              سجّل الدخول الآن للوصول إلى لوحة التحكم وإدارة جميع المهام
              الإدارية بسهولة
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* EMAIL */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  البريد الإلكتروني
                </label>

                <div className="relative">
                  <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                  <input
                    type="email"
                    {...register("email")}
                    placeholder="البريد الإلكتروني"
                    className={`w-full h-12 rounded-xl border px-4 pr-12 outline-none transition
                      ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200 focus:border-[#2b2196]"
                      }`}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  كلمة المرور
                </label>

                <div className="relative">
                  {/* Lock Icon */}
                  <MdLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="كلمة المرور"
                    className={`w-full h-12 rounded-xl border px-4 pr-12 pl-12 outline-none transition ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-200 focus:border-[#2b2196]"
                    }`}
                  />

                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? (
                      <MdVisibility size={22} />
                    ) : (
                      <MdVisibilityOff size={22} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#41A2D8] cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#41A2D8] cursor-pointer"
                  />
                  تذكرني
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[#41A2D8] hover:underline cursor-pointer"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 cursor-pointer rounded-xl text-white font-semibold transition bg-[#41A2D8] hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>
              {/* FOOTER */}
              <div className="flex flex-col items-center gap-2 pt-4 text-[16px] text-[#111827] mt-[100px]">
                <span>تم الإنشاء بواسطة فريق رفيق</span>

                <span className="text-[#41A2D8]  transition text-[16px] border-b cursor-pointer">
                  تواصل معنا
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="hidden lg:flex lg:w-1/2">
        <img
          src={studentImage}
          alt="student"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
