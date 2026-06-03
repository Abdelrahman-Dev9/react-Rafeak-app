import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateNotification from "@/components/notifications/CreateNotification";
import { Spinner } from "@/components/ui/spinner";
import { useGetNotificationsQuery } from "@/redux/service/notifications/notificationsApi";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const Notifications = () => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading, isError } = useGetNotificationsQuery({});
  const notifications = data?.data ?? [];

  // ✅ FILTER LOGIC
  const filteredData = notifications.filter((row: any) => {
    const subject = row?.subject?.toLowerCase() || "";
    const sender = `${row?.user?.firstName ?? ""} ${
      row?.user?.lastName ?? ""
    }`.toLowerCase();

    const query = search.toLowerCase();

    return subject.includes(query) || sender.includes(query);
  });

  return (
    <DashboardLayout>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner className="h-10 w-10 animate-spin text-[#418FBF]" />
        </div>
      ) : isError ? (
        <div className="p-5 text-red-500">فشل تحميل الإشعارات</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4">
            <h2 className="text-[22px] font-semibold text-[#418FBF] shrink-0">
              الإشعارات ({filteredData.length})
            </h2>

            <div className="relative flex-1">
              <RiSearchLine className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن عنوان أو اسم المرسل"
                className="w-full pr-9 pl-3 py-2 border rounded-xl text-right text-sm placeholder-[#C4C9DA]"
              />
            </div>

            <button
              className="bg-[#418FBF] hover:bg-[#357aa8] text-[#EEECF2] text-[14px] font-bold cursor-pointer px-4 py-2 rounded-xl shrink-0 transition-colors"
              onClick={() => setOpenModal(true)}
            >
              إضافة إشعار جديد
            </button>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y text-gray-500">
                <th className="text-right text-[14px] text-[#000000DE] p-4 font-medium">
                  العنوان
                </th>
                <th className="text-right text-[14px] text-[#000000DE] p-4 font-medium">
                  أرسل بواسطة
                </th>
                <th className="text-right text-[14px] text-[#000000DE] p-4 font-medium">
                  أرسل إلى
                </th>
                <th className="text-right text-[14px] text-[#000000DE] p-4 font-medium">
                  أرسل في
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row: any, i: number) => {
                const fullName = `${row?.user?.firstName ?? ""} ${
                  row?.user?.lastName ?? ""
                }`.trim();

                return (
                  <tr
                    key={row._id ?? i}
                    className="border-b last:border-0 hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-4 text-[#000000B2] text-[13px] font-medium">
                      {row?.subject}
                    </td>
                    <td className="p-4 text-[#000000B2] text-[13px] font-medium">
                      {fullName || "-"}
                    </td>
                    <td className="p-4 text-[#000000B2] text-[13px] font-medium">
                      {row?.sendTo}
                    </td>
                    <td className="p-4 text-[#000000B2] text-[13px] font-medium">
                      {row?.createdAt
                        ? new Date(row.createdAt).toISOString().split("T")[0]
                        : "-"}
                    </td>
                  </tr>
                );
              })}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400">
                    لا توجد نتائج
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {openModal && <CreateNotification setOpenModal={setOpenModal} />}
    </DashboardLayout>
  );
};

export default Notifications;
