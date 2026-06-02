import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Spinner } from "@/components/ui/spinner";
import { useGetUsersQuery } from "@/redux/service/users/usersApi";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import avatar from "../assets/avatar.png";

// ==================== Helpers ====================

const statusStyle: any = {
  نشط: "text-green-600 border-green-500",
  "قيد الانتظار": "text-orange-500 border-orange-400",
};

const StatusBadge = ({ status }: any) => (
  <span
    className={`px-6 py-1 rounded-full border text-sm font-medium ${
      statusStyle[status] || "text-gray-500 border-gray-300"
    }`}
  >
    {status || "-"}
  </span>
);

// ==================== Section ====================

const UserSection = ({
  title,
  count,
  rows,
  nameLabel,
  statusLabel,
  defaultOpen = true,
}: any) => {
  const [open, setOpen] = useState(defaultOpen);
  const [search, setSearch] = useState("");

  const filtered = rows.filter((r: any) =>
    `${r.name} ${r.phone}`.includes(search)
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <h2 className="text-[22px] font-semibold text-[#418FBF] shrink-0">
          {title} ({count})
        </h2>

        <div className="relative flex-1">
          <RiSearchLine className="absolute top-1/2 -translate-y-1/2 right-3" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن الاسم أو رقم الهاتف"
            className="w-full pr-9 pl-3 py-2 border rounded-xl text-right"
          />
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="w-8 h-8 rounded-full bg-[#225672] text-white flex items-center justify-center"
        >
          {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
      </div>

      {/* Table */}
      {open && (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y text-gray-500">
              <th className="text-right p-3">{nameLabel}</th>
              <th className="text-right p-3">رقم الهاتف</th>
              <th className="text-right p-3">النوع</th>
              <th className="text-right p-3">{statusLabel}</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row: any, i: any) => (
              <tr
                key={row._id || i}
                className={i % 2 ? "bg-gray-50" : "bg-white"}
              >
                {/* NAME */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={row.avatar || avatar}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{row.name}</span>
                  </div>
                </td>

                <td className="p-3">{row.phone || "-"}</td>
                <td className="p-3">{row.gender || "-"}</td>

                <td className="p-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ==================== Page ====================

const Users = () => {
  const { data, isLoading, isError }: any = useGetUsersQuery({});

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="h-screen flex items-center justify-center">
          <Spinner className="h-10 w-10 animate-spin text-[#418FBF] " />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="p-5 text-red-500">Failed to load users</div>
      </DashboardLayout>
    );
  }

  // ==================== Mapping API → UI ====================

  const volunteers =
    data?.volunteers?.map((u: any) => ({
      _id: u._id,
      name: u.fullName,
      phone: u.phone,
      gender: u.gender,
      status: u.isEngaged ? "نشط" : "قيد الانتظار",
      avatar: u.profileImg,
    })) || [];

  const seekers =
    data?.patients?.map((u: any) => ({
      _id: u._id,
      name: u.fullName,
      phone: u.phone,
      gender: u.gender,
      status: u.isEngaged ? "نشط" : "قيد الانتظار",
      avatar: u.profileImg,
    })) || [];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <UserSection
          title="المتطوعون"
          count={volunteers.length}
          rows={volunteers}
          nameLabel="اسم المتطوع"
          statusLabel="الحالة"
        />

        <UserSection
          title="الباحثون"
          count={seekers.length}
          rows={seekers}
          nameLabel="اسم الباحث"
          statusLabel="الطلبات الحالية"
        />
      </div>
    </DashboardLayout>
  );
};

export default Users;
