import { useAddAdminMutation } from "@/redux/service/admins/adminsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { z } from "zod";
import resetIcon from "../../assets/reset.png";

// ==================== Schema ====================
const schema = z.object({
  firstName: z.string().min(1, "الاسم الأول مطلوب"),
  lastName: z.string().min(1, "اسم العائلة مطلوب"),
  phone: z.string().regex(/^\d{11}$/, "رقم الهاتف يجب أن يكون 11 رقم"),
  email: z.email("البريد الإلكتروني غير صالح"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
});

type FormData = z.infer<typeof schema>;

// ==================== Props ====================
type Props = {
  setOpenModal: (value: boolean) => void;
  handleCreateAdmin: (data: FormData) => void;
};

// ==================== Field Component ====================
const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 gap-3">
      <span className="text-gray-800 font-medium text-sm shrink-0 whitespace-nowrap">
        {label}:
      </span>
      {children}
    </div>

    {error && <p className="text-red-500 text-xs text-right pr-3">{error}</p>}
  </div>
);

// ==================== Component ====================
const CreateAdmin = ({ setOpenModal }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [addAdmin] = useAddAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await addAdmin(data).unwrap();

      console.log("Success:", result);
      setOpenModal(false);
      reset();
    } catch (error: any) {
      console.log("Full error:", error);

      const message =
        error?.data?.message || // normal backend message
        error?.data?.error || // fallback
        error?.data?.errors?.[0]?.msg || // 👈 your case (important)
        error?.error || // RTK fallback
        "حدث خطأ غير متوقع";

      alert(message);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-white w-[680px] rounded-3xl px-12 py-10 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setOpenModal(false)}
          className="absolute top-5 right-5 w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <MdClose size={18} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-[#418FBF] mb-8 mt-10">
          إضافة مدير جديد
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* First Name */}
          <Field label="الاسم الأول" error={errors.firstName?.message}>
            <input
              {...register("firstName")}
              type="text"
              placeholder="مصطفى"
              className="flex-1 text-right text-sm text-gray-400 outline-none placeholder-[#B4B0BF]"
              dir="rtl"
            />
          </Field>

          {/* Last Name */}
          <Field label="اسم العائلة" error={errors.lastName?.message}>
            <input
              {...register("lastName")}
              type="text"
              placeholder="محمد"
              className="flex-1 text-right text-sm text-gray-400 outline-none placeholder-[#B4B0BF]"
              dir="rtl"
            />
          </Field>

          {/* Phone */}
          <Field label="هاتف المدير" error={errors.phone?.message}>
            <input
              {...register("phone")}
              type="tel"
              placeholder="966+ 12345678"
              className="flex-1 text-right text-sm text-gray-400 outline-none placeholder-[#B4B0BF]"
              dir="rtl"
            />
          </Field>

          {/* Email */}
          <Field label="البريد الإلكتروني" error={errors.email?.message}>
            <input
              {...register("email")}
              type="email"
              placeholder="admin@mail.com"
              className="flex-1 text-right text-sm text-gray-400 outline-none placeholder-[#B4B0BF]"
              dir="ltr"
            />
          </Field>

          {/* Password */}
          <Field label="كلمة المرور" error={errors.password?.message}>
            <div className="flex items-center w-full">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="أدخل كلمة المرور"
                className="flex-1 text-right text-sm text-gray-400 outline-none placeholder-[#B4B0BF]"
                dir="ltr"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-gray-500 hover:text-gray-700 ml-2"
              >
                {showPassword ? (
                  // eye off
                  <IoEyeOutline className="w-5 h-5" />
                ) : (
                  // eye
                  <IoEyeOffOutline className="w-5 h-5" />
                )}
              </button>
            </div>
          </Field>

          {/* Actions */}
          <div className="flex flex-row-reverse items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-[#418FBF] hover:bg-[#357aa8] text-white font-semibold px-16 py-3 rounded-2xl transition-colors cursor-pointer"
            >
              إضافة
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="flex items-center gap-2 border border-[#418FBF] text-[#418FBF] hover:bg-blue-50 font-semibold px-10 py-3 rounded-2xl transition-colors cursor-pointer"
            >
              <img src={resetIcon} alt="resetIcon" />
              إعادة تعيين الكل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
