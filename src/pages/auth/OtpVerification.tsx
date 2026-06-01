import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyCodeMutation } from "@/redux/service/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import blueLook from "../../assets/blueLook.png";
import logo from "../../assets/logo.png";
import mailImage from "../../assets/mail.png";

const otpSchema = z.object({
  resetCode: z
    .string()
    .min(6, "يجب إدخال رمز مكون من 6 أرقام")
    .max(6, "يجب إدخال رمز مكون من 6 أرقام"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

const OtpVerification = () => {
  const navigate = useNavigate();
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  const otpValue = useWatch({
    control: form.control,
    name: "resetCode",
  });

  const onSubmit = async (data: OtpFormValues) => {
    try {
      const res = await verifyCode({
        resetCode: data.resetCode,
      }).unwrap();

      alert(res.message || "Code verified successfully");

      navigate("/reset-password");
    } catch (error: any) {
      alert(error?.data?.message || error?.message || "Something went wrong");
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
              <img src={mailImage} alt="mailImage" />

              <h1 className="text-[32px] font-bold text-[#41A2D8]">
                تحقق من بريدك الإلكتروني
              </h1>

              <p className="mt-2 text-center text-[16px] text-[#374151]">
                أدخل الرمز الذي تم إرساله إلى البريد الإلكتروني:
                ahmedr**@gmail.com
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="resetCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            value={field.value}
                            onChange={(value) => {
                              // ✅ ensure string always
                              const code = Array.isArray(value)
                                ? value.join("")
                                : String(value);

                              field.onChange(code.replace(/\s/g, ""));
                            }}
                          >
                            <InputOTPGroup dir="ltr" className="flex gap-3">
                              <InputOTPSlot
                                index={0}
                                className="h-14 w-14 rounded-[8px] border-2 text-xl border-[#3A95D2] font-semibold data-[active=true]:border-[#3A95D2] data-[active=true]:ring-0"
                              />
                              <InputOTPSlot
                                index={1}
                                className="h-14 w-14 rounded-[8px] border-2 text-xl border-[#3A95D2] font-semibold data-[active=true]:border-[#3A95D2] data-[active=true]:ring-0"
                              />
                              <InputOTPSlot
                                index={2}
                                className="h-14 w-14 rounded-[8px] border-2 text-xl border-[#3A95D2] font-semibold data-[active=true]:border-[#3A95D2] data-[active=true]:ring-0"
                              />
                              <InputOTPSlot
                                index={3}
                                className="h-14 w-14 rounded-[8px] border-2 text-xl border-[#3A95D2] font-semibold data-[active=true]:border-[#3A95D2] data-[active=true]:ring-0"
                              />
                              <InputOTPSlot
                                index={4}
                                className="h-14 w-14 rounded-[8px] border-2 text-xl border-[#3A95D2] font-semibold data-[active=true]:border-[#3A95D2] data-[active=true]:ring-0"
                              />
                              <InputOTPSlot
                                index={5}
                                className="h-14 w-14 rounded-[8px] border-2 text-xl border-[#3A95D2] font-semibold data-[active=true]:border-[#3A95D2] data-[active=true]:ring-0"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>

                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-[16px] bg-[#41A2D8] text-[#FFFFFF] cursor-pointer hover:bg-[#41A2D8]"
                  disabled={(otpValue?.length ?? 0) !== 6}
                >
                  {isLoading
                    ? "جاري إعادة تعيين كلمة المرور..."
                    : "إعادة تعيين كلمة المرور"}
                </Button>
              </form>
            </Form>

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

export default OtpVerification;
