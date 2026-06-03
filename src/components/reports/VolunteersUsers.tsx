import avatarFallback from "@/assets/avatar.png";
import { Spinner } from "@/components/ui/spinner";
import { useGetReportsQuery } from "@/redux/service/reports/reportsApi";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";

const VolunteersUsers = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetReportsQuery({});

  const reports = data?.volunteers ?? [];

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner className="h-10 w-10 animate-spin text-[#418FBF]" />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between bg-white p-4 rounded-[24px]">
            <h2 className="text-[22px] font-semibold text-[#418FBF]">
              قائمة التقارير ({reports.length})
            </h2>
            <div className="flex items-center justify-center gap-2 bg-[#225672] text-white text-sm font-medium px-5 py-2 rounded-full w-[30%]">
              <span>تقارير المتطوعين</span>
              <span className="bg-white text-[#3a7a98] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center text-start">
                {reports.length}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Search */}
            <div className="flex items-center gap-3 px-5 py-4">
              <h2 className="text-[22px] font-semibold text-[#418FBF] shrink-0">
                المتطوعون ({reports.length})
              </h2>

              <div className="relative flex-1">
                <RiSearchLine className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث عن اسم المتطوع"
                  className="w-full pr-9 pl-3 py-2 border rounded-xl text-right text-sm"
                />
              </div>
            </div>

            {/* Body */}

            <table className="w-full text-sm">
              <thead>
                <tr className="border-y">
                  <th className="p-4 text-right text-[14px] text-[#000000DE] font-medium">
                    تاريخ التقرير
                  </th>
                  <th className="p-4 text-right text-[14px] text-[#000000DE] font-medium">
                    اسم المتطوع
                  </th>
                  <th className="p-4 text-right text-[14px] text-[#000000DE] font-medium">
                    التقييم
                  </th>
                  <th className="p-4 text-right text-[14px] text-[#000000DE] font-medium">
                    تفاصيل
                  </th>
                </tr>
              </thead>

              <tbody>
                {reports.map((row: any, i: number) => {
                  const fullName =
                    `${row?.user?.firstName ?? ""} ${
                      row?.user?.lastName ?? ""
                    }`.trim() || "-";

                  const date = row?.createdAt
                    ? new Date(row.createdAt).toLocaleDateString("en-US")
                    : "-";

                  return (
                    <tr
                      key={row._id ?? i}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">{date}</td>

                      <td className="p-4 flex items-center gap-2">
                        <img
                          src={row?.user?.profileImg || avatarFallback}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{fullName}</span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) =>
                            s <= (row?.ratings ?? 0) ? (
                              <AiFillStar
                                key={s}
                                className="text-yellow-400 text-lg"
                              />
                            ) : (
                              <AiOutlineStar
                                key={s}
                                className="text-yellow-400 text-lg"
                              />
                            )
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        {row?.complaint ?? row?.title ?? "-"}
                      </td>
                    </tr>
                  );
                })}

                {reports.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-400">
                      لا توجد نتائج
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default VolunteersUsers;
