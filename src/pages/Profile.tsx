import avatar from "@/assets/avatar.png";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  useChangePasswordMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "@/redux/service/profile/profileApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import z from "zod";

/* ─── Zod schema ─────────────────────────────────────────── */
const passwordSchema = z
  .object({
    oldPassword: z.string().min(8, "كلمة المرور الحالية مطلوبة"),
    newPassword: z.string().min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
    confirmPassword: z.string().min(8, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImg: FileList;
};

/* ─── Component ──────────────────────────────────────────── */
const Profile = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeButton, setActiveButton] = useState<
    "password" | "profile" | null
  >("profile");

  /* ── Queries / mutations ── */
  const { data: adminProfile, isLoading } = useGetAdminProfileQuery({});
  const [updateProfile, { isLoading: updating }] =
    useUpdateAdminProfileMutation();
  const [updatePassword, { isLoading: updatingPassword }] =
    useChangePasswordMutation();

  /* ── Profile form ── */
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = useForm<ProfileFormValues>();

  // ✅ useWatch instead of watch() — memoization-safe
  const selectedImage = useWatch({ control, name: "profileImg" });

  useEffect(() => {
    if (adminProfile?.admin) {
      reset({
        firstName: adminProfile.admin.firstName || "",
        lastName: adminProfile.admin.lastName || "",
        email: adminProfile.admin.email || "",
        phone: adminProfile.admin.phone || "",
      });
    }
  }, [adminProfile, reset]);

  const onSubmitProfile = async (data: ProfileFormValues) => {
    try {
      const formData = new FormData();
      if (data.firstName) formData.append("firstName", data.firstName);
      if (data.lastName) formData.append("lastName", data.lastName);
      if (data.email) formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);
      if (data.profileImg?.[0])
        formData.append("profileImg", data.profileImg[0]);
      await updateProfile(formData).unwrap();
      alert("تم تحديث الملف الشخصي بنجاح");
    } catch (error) {
      console.error(error);
      alert("فشل تحديث الملف الشخصي");
    }
  };

  /* ── Password form ── */
  const {
    register: registerPw,
    handleSubmit: handleSubmitPw,
    reset: resetPw,
    formState: { errors: pwErrors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitPassword = async (data: PasswordFormValues) => {
    try {
      await updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      alert("تم تحديث كلمة المرور بنجاح");
      resetPw();
    } catch (error: any) {
      console.error(error);
      alert(error?.data?.message || "فشل تحديث كلمة المرور");
    }
  };

  const previewImage = selectedImage?.[0]
    ? URL.createObjectURL(selectedImage[0])
    : adminProfile?.admin?.profileImg || avatar;

  return (
    <DashboardLayout>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner className="h-10 w-10 animate-spin text-[#418FBF]" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h2 className="text-[20px] font-semibold text-[#418FBF] text-right">
              ملف تعريف المسؤول
            </h2>
          </div>

          {/* ── Profile Form ── */}
          <form
            onSubmit={handleSubmit(onSubmitProfile)}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="w-[350px] flex flex-col gap-4">
                <div className="h-[428px] rounded-2xl border-2 border-dashed border-[#418FBF] overflow-hidden">
                  <img
                    src={previewImage}
                    alt="profile"
                    className="w-full h-full object-cover p-8"
                  />
                </div>
                <Label className="cursor-pointer border border-gray-300 p-3 rounded-md justify-center text-gray-500 hover:bg-gray-50">
                  اختر صورة
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("profileImg")}
                    className="hidden"
                  />
                </Label>
              </div>

              {/* Info Fields */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2 border p-4 rounded-[10px]">
                  <Label className="text-right">الاسم الأول</Label>
                  <Input
                    {...register("firstName")}
                    className="bg-gray-100 text-right p-6"
                  />
                </div>

                <div className="flex flex-col gap-2 border p-4 rounded-[10px]">
                  <Label className="text-right">الاسم الأخير</Label>
                  <Input
                    {...register("lastName")}
                    className="bg-gray-100 text-right p-6"
                  />
                </div>

                <div className="flex flex-col gap-2 border p-4 rounded-[10px]">
                  <Label className="text-right">البريد الإلكتروني</Label>
                  <Input
                    {...register("email")}
                    className="bg-gray-100 text-right p-6"
                  />
                </div>

                <div className="flex flex-col gap-2 border p-4 rounded-[10px]">
                  <Label className="text-right">رقم الهاتف</Label>
                  <Input
                    {...register("phone")}
                    className="bg-gray-100 text-right p-6"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={updating || !isDirty}
              onClick={() => setActiveButton("profile")}
              className={`w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-5 ${
                activeButton === "profile"
                  ? "bg-[#418FBF] text-white"
                  : "bg-transparent border border-[#418FBF] text-[#418FBF]"
              } ${updating || !isDirty ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <TbEdit size={18} />
              <span>
                {updating ? "جاري حفظ التعديلات..." : "تعديل الملف الشخصي"}
              </span>
            </button>
          </form>

          {/* ── Password Form ── */}
          <form
            onSubmit={handleSubmitPw(onSubmitPassword)}
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5"
          >
            <h3 className="text-[18px] font-semibold text-[#418FBF] text-right">
              تغيير كلمة المرور
            </h3>

            {/* Current Password */}
            <div className="flex flex-col gap-2 border p-4 rounded-[10px] relative">
              <Label className="text-right">كلمة المرور الحالية</Label>
              <Input
                type={showCurrent ? "text" : "password"}
                placeholder="أدخل كلمة المرور الحالية"
                {...registerPw("oldPassword")}
                className="bg-gray-100 text-[#6B728080] text-right mt-1 p-6 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute left-8 top-2/3 -translate-y-2/3 text-[#F3F4F6] bg-[#225672] p-2 rounded-full cursor-pointer"
              >
                {showCurrent ? (
                  <IoEyeOutline size={18} />
                ) : (
                  <IoEyeOffOutline size={18} />
                )}
              </button>
              {pwErrors.oldPassword && (
                <p className="text-red-500 text-sm text-right">
                  {pwErrors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2 border p-4 rounded-[10px] relative">
              <Label className="text-right">كلمة المرور الجديدة</Label>
              <Input
                type={showNew ? "text" : "password"}
                placeholder="أدخل كلمة المرور الجديدة"
                {...registerPw("newPassword")}
                className="bg-gray-100 text-[#6B728080] text-right mt-1 p-6 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute left-8 top-2/3 -translate-y-2/3 text-[#F3F4F6] bg-[#225672] p-2 rounded-full cursor-pointer"
              >
                {showNew ? (
                  <IoEyeOutline size={18} />
                ) : (
                  <IoEyeOffOutline size={18} />
                )}
              </button>
              {pwErrors.newPassword && (
                <p className="text-red-500 text-sm text-right">
                  {pwErrors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2 border p-4 rounded-[10px] relative">
              <Label className="text-right">تأكيد كلمة المرور الجديدة</Label>
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="أدخل تأكيد كلمة المرور الجديدة"
                {...registerPw("confirmPassword")}
                className="bg-gray-100 text-[#6B728080] text-right p-6 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute left-8 top-2/3 -translate-y-2/3 text-[#F3F4F6] bg-[#225672] p-2 rounded-full cursor-pointer"
              >
                {showConfirm ? (
                  <IoEyeOutline size={18} />
                ) : (
                  <IoEyeOffOutline size={18} />
                )}
              </button>
              {pwErrors.confirmPassword && (
                <p className="text-red-500 text-sm text-right">
                  {pwErrors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={updatingPassword}
              onClick={() => setActiveButton("password")}
              className={`w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors ${
                activeButton === "password"
                  ? "bg-[#418FBF] text-white"
                  : "bg-transparent border border-[#418FBF] text-[#418FBF]"
              }`}
            >
              <TbEdit size={18} />
              <span>
                {updatingPassword
                  ? "جاري تحديث كلمة المرور..."
                  : "تعديل كلمة المرور"}
              </span>
            </button>
          </form>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profile;
