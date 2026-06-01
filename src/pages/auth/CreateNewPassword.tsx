import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import blueLook from "../../assets/blueLook.png";
import lock2 from "../../assets/lock2.png";
import logo from "../../assets/logo.png";
import { useResetPasswordMutation } from "@/redux/service/auth/authApi";

const passwordSchema = z
  .object({
    password: z.string().min(6, "كلمة المرور مطلوب"),
    confirmPassword: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof passwordSchema>;

const CreateNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await resetPassword({
        newPassword: data.password,
        passwordConfirm: data.confirmPassword,
      }).unwrap();
      navigate("/login");
    } catch (error: any) {
      alert(error?.data?.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور");
    }
  };

  return (
    <div className="h-screen overflow-hidden grid lg:grid-cols-2">
      {/* Form Section */}
      <div className="flex flex-col justify-between p-6 lg:p-10">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" />
            <span className="text-[#41A2D8] font-bold text-xl">رفيق</span>
          </Link>

          <p className="text-[14px] text-[#111827]">
            هل لديك حساب بالفعل؟
            <Link
              to="/login"
              className="text-[#41A2D8] font-medium border-b border-[#41A2D8]"
            >
              تسجيل الدخول
            </Link>
          </p>
        </header>

        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center">
              <img src={lock2} alt="lock2" />

              <h1 className="text-[32px] font-bold text-[#41A2D8]">
                إنشاء كلمة مرور جديدة
              </h1>

              <p className="mt-2 text-center text-[16px] text-[#374151]">
                يجب أن تكون كلمة المرور الجديدة مختلفة عن كلمات المرور التي
                استخدمتها سابقًا
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Label className="block mb-2 text-[14px] font-semibold">
                            كلمة المرور الجديدة
                          </Label>

                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="كلمة المرور الجديدة"
                            className="h-12 pr-10 pl-10 text-right"
                            {...field}
                          />

                          <div
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute left-3 top-2/3 -translate-y-1/2 cursor-pointer text-gray-500"
                          >
                            {showPassword ? (
                              <AiOutlineEye size={20} />
                            ) : (
                              <AiOutlineEyeInvisible size={20} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Label className="block mb-2 text-[14px] font-semibold">
                            تأكيد كلمة المرور
                          </Label>

                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="تأكيد كلمة المرور"
                            className="h-12 pr-10 pl-10 text-right"
                            {...field}
                          />

                          <div
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            className="absolute left-3 top-2/3 -translate-y-1/2 cursor-pointer text-gray-500"
                          >
                            {showConfirmPassword ? (
                              <AiOutlineEye size={20} />
                            ) : (
                              <AiOutlineEyeInvisible size={20} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-[16px] bg-[#41A2D8] text-[#FFFFFF] cursor-pointer hover:bg-[#41A2D8]"
                >
                  {isLoading ? "جاري التحديث..." : "إعادة تعيين كلمة المرور"}
                </Button>
              </form>
            </Form>

            {/* Footer */}
            <footer className="text-center text-[16px] font-semibold text-[#111827] text-muted-foreground mt-40">
              تم الإنشاء بواسطة فريق رفيق
              <br />
              <span className="text-[#41A2D8] font-normal border-b border-[#41A2D8] cursor-pointer">
                تواصل معنا
              </span>
            </footer>
          </div>
        </main>
      </div>

      {/* Image Section */}
      <div className="hidden lg:flex items-center justify-center bg-muted p-20">
        <img
          src={blueLook}
          alt="OTP Verification"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default CreateNewPassword;
