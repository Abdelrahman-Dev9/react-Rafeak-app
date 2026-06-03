import avatar from "@/assets/avatar.png";
import CreateAdmin from "@/components/admins/CreateAdmin";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Spinner } from "@/components/ui/spinner";
import { useGetAdminsQuery } from "@/redux/service/admins/adminsApi";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const Admins = () => {
  const [search, setSearch] = useState("");
  const { data: admins, isLoading, isError } = useGetAdminsQuery({});
  const [openModal, setOpenModal] = useState(false);

  const filtered = admins?.allAdmins?.filter((a: any) =>
    `${a.name} ${a.phone} ${a.email}`.includes(search)
  );

  const handleCreateAdmin = (data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    console.log("New Admin:", data);
  };

  return (
    <DashboardLayout>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner className="h-10 w-10 animate-spin text-[#418FBF]" />
        </div>
      ) : isError ? (
        <div className="p-5 text-red-500">فشل تحميل المديرين</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4">
            <h2 className="text-[22px] font-semibold text-[#418FBF] shrink-0">
              المديرون ({admins?.allAdmins?.length})
            </h2>

            <div className="relative flex-1">
              <RiSearchLine className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن الاسم أو الهاتف أو البريد الإلكتروني"
                className="w-full pr-9 pl-3 py-2 border rounded-xl text-right text-sm placeholder-[#C4C9DA]"
              />
            </div>

            <button
              className="bg-[#418FBF] hover:bg-[#357aa8] text-[#EEECF2] text-[14px] font-bold cursor-pointer  px-4 py-2 rounded-xl shrink-0 transition-colors"
              onClick={() => setOpenModal(!openModal)}
            >
              إضافة مدير جديد
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y text-gray-500">
                <th className="text-right text-[#000000DE] text-[14px] p-4 font-medium">
                  اسم المدير
                </th>
                <th className="text-right text-[#000000DE] text-[14px] p-4 font-medium">
                  هاتف المدير
                </th>
                <th className="text-right text-[#000000DE] text-[14px] p-4 font-medium">
                  البريد الإلكتروني
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row: any, i: any) => (
                <tr
                  key={row._id ?? i}
                  className="border-b last:border-0 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={row.avatar || avatar}
                        className="w-8 h-8 rounded-full object-cover"
                        alt="avatar"
                      />
                      <span>
                        {row.firstName} {row.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{row.phone || "-"}</td>
                  <td className="p-4 text-gray-600">{row.email || "-"}</td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-400">
                    لا توجد نتائج
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {openModal && (
            <CreateAdmin
              handleCreateAdmin={handleCreateAdmin}
              setOpenModal={setOpenModal}
            />
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Admins;
