import { useGetUserByIdQuery } from "@/redux/service/users/usersApi";
import { FaCalendar } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import avatar from "../../assets/avatar.png";

interface Props {
  userId: string;
}

const UserInf = ({ userId }: Props) => {
  const { data: user } = useGetUserByIdQuery(userId);
  return (
    <div dir="rtl">
      {/* Top row: fields + avatar */}
      <div className="flex gap-5 items-stretch mb-4">
        {/* Avatar */}
        <div className=" border border-gray-200 rounded-xl  flex items-center justify-center p-4 ">
          <img
            src={user?.user?.profileImg ? user?.user?.profileImg : avatar}
            alt="avatar"
            className="w-[95px] h-[100px] object-cover rounded-lg"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-3">
          {/* First + Last Name */}
          <div className="flex gap-3 ">
            <div className="flex-1 border border-gray-200 rounded-xl gap-1 p-4 flex items-center">
              <p className="text-[13px] font-semibold text-[#000000DE]">
                الاسم الأول:
              </p>
              <p className="text-[14px] font-medium text-[#000000B2]">
                {user?.user?.firstName ?? "مصطفى"}
              </p>
            </div>

            <div className="flex-1 border border-gray-200 rounded-xl p-4 flex items-center gap-1">
              <p className="text-[13px] font-semibold text-[#000000DE]">
                اسم العائلة:
              </p>
              <p className="text-[14px] font-medium text-[#000000B2]">
                {user?.user?.lastName ?? "محمد"}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-3 mt-4">
            {/* Phone */}
            <div className="border border-gray-200 rounded-xl p-4 flex gap-1">
              <p className="text-[13px] font-semibold text-[#000000DE] w-30">
                هاتف المستخدم:
              </p>
              <p className="text-[14px] font-medium text-[#000000B2]">
                {user?.user?.phone ?? "+966 12345678"}
              </p>
            </div>

            {/* Gender */}
            <div className="border border-gray-200 rounded-xl p-4 flex gap-1 items-center w-full">
              <p className="text-[13px] font-semibold text-[#000000DE]">
                الجنس:
              </p>
              <p className="text-[14px] font-medium text-[#000000B2]">
                {user?.user?.gender ?? "ذكر"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Date of Birth */}
      <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 mb-2 justify-between">
        <div className=" rounded-xl flex gap-2">
          <p className="text-[13px] font-semibold text-[#000000DE] mb-1">
            تاريخ الميلاد
          </p>
          <p className="text-[14px] font-semibold text-[#000000B2]">
            {user?.user?.birthday?.split("T")[0] ?? "10/30/2024"}
          </p>
        </div>
        <FaCalendar />
      </div>

      {/* Email */}
      <div className="border border-gray-200 rounded-xl px-4 py-3 flex gap-2 mt-4">
        <p className="text-[13px] font-semibold text-[#000000DE] mb-1">
          البريد الإلكتروني
        </p>
        <p className="text-[14px] font-semibold text-[#000000B2] mb-1">
          {user?.user?.email ?? "Mostafa@gmail.com"}
        </p>
      </div>

      {/* Block Button */}
      <div className="flex justify-start mt-4 ">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-[#418FBF] text-[#418FBF]  cursor-pointer text-[18px] font-semibold">
          <ImBlocked className="text-[#418FBF]" />
          حظر المستخدم
        </button>
      </div>
    </div>
  );
};

export default UserInf;
