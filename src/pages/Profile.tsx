import avatar from "@/assets/avatar.png";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useGetAdminProfileQuery } from "@/redux/service/profile/profileApi";
import { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Profile = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm] = useState(false);
  const { data: adminProfile, isLoading } = useGetAdminProfileQuery({});

  return (
    <DashboardLayout>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner className="h-10 w-10 animate-spin text-[#418FBF]" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-4 ">
            <h2 className="text-[20px] font-semibold text-[#418FBF] text-right ">
              ملف تعريف المسؤول
            </h2>
          </div>
          {/* Profile Info Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="w-[350px] h-[400px] rounded-2xl border-2 border-dashed border-[#418FBF] overflow-hidden">
                <img
                  src={adminProfile?.admin?.profileImg ?? avatar}
                  alt="profile"
                  className="w-full h-full object-cover p-8"
                />
              </div>
              {/* Info Fields */}
              <div className="flex-1 flex flex-col gap-10">
                {/* Name */}
                <div className="flex flex-col gap-2 border  p-4 rounded-[10px]">
                  <Label className="text-right">الاسم</Label>
                  <Input
                    defaultValue={`${adminProfile?.admin?.firstName ?? ""} ${
                      adminProfile?.admin?.lastName ?? ""
                    }`.trim()}
                    className="bg-gray-100 text-[#6B728080] text-right p-6 mt-1"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 border  p-4 rounded-[10px]">
                  <Label className="text-right">البريد الإلكتروني</Label>
                  <Input
                    defaultValue={adminProfile?.admin?.email}
                    className="bg-gray-100 text-[#6B728080] text-right p-6 mt-1"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2 border  p-4 rounded-[10px]">
                  <Label className="text-right">رقم الهاتف</Label>
                  <Input
                    defaultValue={adminProfile?.admin?.phone}
                    className="bg-gray-100 text-[#6B728080] text-right p-6 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
            {/* Current Password */}
            <div className="flex flex-col gap-2 border p-4 rounded-[10px] relative">
              <Label className="text-right">كلمة المرور الحالية</Label>

              <Input
                type={showCurrent ? "text" : "password"}
                placeholder="أدخل كلمة المرور الحالية"
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
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2 border p-4 rounded-[10px] relative">
              <Label className="text-right">كلمة المرور الجديدة</Label>

              <Input
                type={showNew ? "text" : "password"}
                placeholder="أدخل كلمة المرور الجديدة"
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
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2 border p-4 rounded-[10px] relative">
              <Label className="text-right">تأكيد كلمة المرور الجديدة</Label>

              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="أدخل تأكيد كلمة المرور الجديدة"
                className="bg-gray-100 text-[#6B728080] text-right p-6 pr-12"
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
            </div>

            {/* Submit */}
            <button className="w-full bg-[#418FBF] hover:bg-[#357aa8] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-1">
              <CiCircleCheck
                size={18}
                className="text-xl font-bold text-white"
              />
              <span>حفظ كلمة المرور</span>
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profile;
