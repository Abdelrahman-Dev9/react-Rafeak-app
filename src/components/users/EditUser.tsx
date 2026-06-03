import {
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
} from "@/redux/service/admins/adminsApi";
import avatar from "../../assets/avatar.png";
import { TbEdit } from "react-icons/tb";
import { GoCircleSlash } from "react-icons/go";
import { Spinner } from "../ui/spinner";

const EditUser = ({
  setOpenUserModal,
  userId,
}: {
  setOpenUserModal: (v: boolean) => void;
  userId: string;
}) => {
  const { data: admin, isLoading } = useGetAdminByIdQuery(userId);
  const [deleteAdmin] = useDeleteAdminMutation();
  const handleDelete = async () => {
    const confirmDelete = window.confirm("هل أنت متأكد من حذف المدير؟");

    if (!confirmDelete) return;

    try {
      const res = await deleteAdmin(userId).unwrap();
      setOpenUserModal(false);

      alert(res?.message || "تم حذف المدير بنجاح");
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "حدث خطأ غير متوقع");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {isLoading ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[680px] max-w-[95vw] min-h-[450px] flex items-center justify-center">
            <Spinner className="h-10 w-10 animate-spin text-[#418FBF]" />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 w-[680px] max-w-[95vw] relative">
          {/* Close */}
          <button
            onClick={() => setOpenUserModal(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white text-sm transition"
          >
            ✕
          </button>

          {/* Title */}
          <h2
            className="text-center text-[24px] font-semibold text-[#418FBF] mb-8 mt-5"
            dir="rtl"
          >
            {admin?.admin?.firstName}
            {admin?.admin?.lastName}
            <span className="text-[#418FBF] font-semibold text-[24px]">
              (مدير)
            </span>
          </h2>

          {/* Body */}
          <div className="flex gap-5 items-start" dir="rtl">
            {/* Avatar */}
            <div className="w-[220px] h-[220px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src={admin?.admin?.profileImg || avatar}
                alt="avatar"
                className="w-full h-full object-cover p-4"
              />
            </div>
            {/* Fields */}
            <div className="flex-1 flex flex-col gap-7">
              <div className="border border-[#263238] rounded-xl px-5 py-4 text-right text-[#000000DE] text-[13px] font-semibold">
                اسم المدير :
                <span className="text-[#000000B2] text-[14px]">
                  {admin?.admin?.firstName} {admin?.admin?.lastName}
                </span>
              </div>
              <div className="border border-[#263238] rounded-xl px-5 py-4 text-right text-[#000000DE] text-[13px] font-semibold">
                هاتف المدير:
                <span className="text-[#000000B2] text-[14px]">
                  {admin?.admin?.phone}
                </span>
              </div>
              <div className="border border-[#263238] rounded-xl px-5 py-4 text-right text-[#000000DE] text-[13px] font-semibold">
                البريد الالیكتروني :
                <span className="text-[#000000B2] text-[14px]">
                  {admin?.admin?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center mt-8 ">
            {/* Delete — outlined */}
            <button
              onClick={handleDelete}
              className="flex items-center gap-3 border border-[#418FBF]  text-[#418FBF] text-[16px] px-6 py-4 rounded-xl text-sm font-semibold transition"
            >
              <GoCircleSlash size={22} />
              حذف المدير
            </button>

            {/* Edit — filled blue */}
            <button className="flex items-center gap-3 bg-[#418FBF]  text-[#FFFFFF] text-[16px] px-6 py-4 rounded-xl text-sm font-semibold cursor-pointer">
              <TbEdit size={22} />
              تعديل المدير
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
