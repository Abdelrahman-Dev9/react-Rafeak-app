import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/service/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import logo from "../../assets/logo.png";
import studentImage from "../../assets/studentImage.png";

// ==================== Schema ====================
const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ==================== Component ====================
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      localStorage.setItem("token", res.token);

      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error?.data?.message || error?.error || "حدث خطأ غير متوقع";

      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* ==================== FORM SIDE ==================== */}
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

        {/* Center */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-[#418FBF] mb-2">
              مرحبًا بعودتك
            </h1>

            <p className="text-center text-gray-600 mb-8 mt-5">
              سجّل الدخول الآن للوصول إلى لوحة التحكم وإدارة جميع المهام
              الإدارية بسهولة
            </p>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* ==================== EMAIL ==================== */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="block mb-2 text-sm font-medium">
                        البريد الإلكتروني
                      </Label>

                      <div className="relative">
                        <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl z-10" />

                        <FormControl>
                          <Input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            {...field}
                            className={`w-full h-12 rounded-xl px-4 pr-12 outline-none transition ${
                              form.formState.errors.email
                                ? "border-red-500"
                                : "border-gray-200 focus:border-[#2b2196]"
                            }`}
                          />
                        </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ==================== PASSWORD ==================== */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="block mb-2 text-sm font-medium">
                        كلمة المرور
                      </Label>

                      <div className="relative">
                        <MdLock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl z-10" />

                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="كلمة المرور"
                            {...field}
                            className={`w-full h-12 rounded-xl px-4 pr-12 pl-12 outline-none transition ${
                              form.formState.errors.password
                                ? "border-red-500"
                                : "border-gray-200 focus:border-[#2b2196]"
                            }`}
                          />
                        </FormControl>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute left-2 top-1  h-10 w-10 p-0 hover:bg-transparent transition-none  cursor-pointer"
                        >
                          {showPassword ? (
                            <MdVisibility className="size-5" />
                          ) : (
                            <MdVisibilityOff className="size-5" />
                          )}
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ==================== OPTIONS ==================== */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-[#41A2D8] cursor-pointer">
                    <Checkbox />
                    تذكرني
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-[#41A2D8] hover:underline cursor-pointer"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                {/* ==================== SUBMIT ==================== */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 cursor-pointer rounded-xl text-white font-semibold transition bg-[#41A2D8] hover:bg-[#41A2D8] hover:opacity-90 disabled:opacity-60"
                >
                  {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>

                {/* ==================== FOOTER ==================== */}
                <div className="flex flex-col items-center gap-2 pt-4 text-[16px] text-[#111827] mt-20">
                  <span>تم الإنشاء بواسطة فريق رفيق</span>

                  <span className="text-[#41A2D8] transition text-[16px] border-b cursor-pointer">
                    تواصل معنا
                  </span>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {/* ==================== IMAGE SIDE ==================== */}
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
