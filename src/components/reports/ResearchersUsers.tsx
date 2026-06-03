import { useGetReportsQuery } from "@/redux/service/reports/reportsApi";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import avatar from "../../assets/avatar.png";

const ResearchersUsers = () => {
  const [search, setSearch] = useState("");

  const { data } = useGetReportsQuery({});

  const reports = data?.researchers ?? [];
  return (
    <div className="mt-8">
      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Search */}
        <div className="flex items-center gap-3 px-5 py-4">
          <h2 className="text-[22px] font-semibold text-[#418FBF] shrink-0">
            الباحثون ({reports.length})
          </h2>

          <div className="relative flex-1">
            <RiSearchLine className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن اسم الباحث"
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
                <tr key={row._id ?? i} className="border-b hover:bg-gray-50">
                  <td className="p-4">{date}</td>

                  <td className="p-4 flex items-center gap-2">
                    <img
                      src={row?.user?.profileImg || avatar}
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

                  <td className="p-4">{row?.complaint ?? row?.title ?? "-"}</td>
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
  );
};

export default ResearchersUsers;
