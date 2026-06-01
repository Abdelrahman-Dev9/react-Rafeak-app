import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/redux/service/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import blueLockImage from "../../assets/blueLook.png";
import lock1 from "../../assets/lock.png";
import logo from "../../assets/logo.png";

const schema = z.object({
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: FormData) => {
    try {
      const res = await forgotPassword({ email }).unwrap();
      alert(res.message);

      localStorage.setItem("token", res.token);
      navigate("/otp-verification", {
        state: { email },
      });
    } catch (error: any) {
      alert(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 md:px-8 pt-6">
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
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <img src={lock1} alt="lock1" />
            </div>

            <h1 className="text-[32px] font-bold text-[#41A2D8] text-center mb-2">
              هل نسيت كلمة المرور؟
            </h1>

            <p className="text-gray-500 text-[14px] text-center mb-8">
              سيتم إرسال رمز إلى بريدك الإلكتروني لإعادة تعيين كلمة المرور
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-sm font-medium">
                        البريد الإلكتروني
                      </Label>

                      <div className="relative">
                        <MdEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="البريد الإلكتروني"
                            className="w-full h-12 rounded-xl px-4 pr-12 border border-gray-200 focus:border-[#41A2D8]"
                          />
                        </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg text-white bg-[#41A2D8] font-semibold"
                >
                  {isLoading ? "جاري الإرسال..." : "تأكيد"}
                </button>
              </form>
            </Form>

            <div className="mt-20">
              <p className="text-center text-[16px] text-[#111827] pb-6">
                تم الإنشاء بواسطة فريق رفيق •
                <br />
                <span className="text-[#41A2D8] border-b border-[#41A2D8] cursor-pointer">
                  تواصل معنا
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-[#f5f9ff] items-center justify-center">
        <img
          src={blueLockImage}
          alt="blueLockImage"
          className="object-contain"
        />
      </div>
    </div>
  );
};
export default ForgotPassword;
