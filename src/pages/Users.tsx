import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import avatar from "../assets/avatar.png";

// ==================== Types ====================

type UserStatus = "نشط" | "قيد الانتظار";

interface UserRow {
  name: string;
  phone: string;
  gender: string;
  status: UserStatus;
}

// ==================== Data ====================

const volunteers: UserRow[] = [
  { name: "دارلين روبرتسون", phone: "(+20) 123 45678910", gender: "ذكر",  status: "نشط"          },
  { name: "تيريزا كوبر",     phone: "(+20) 123 45678910", gender: "أنثى", status: "قيد الانتظار" },
  { name: "جيرالدين فيليبس", phone: "(+20) 123 45678910", gender: "ذكر",  status: "قيد الانتظار" },
  { name: "ناتالي ستيوارت",  phone: "(+20) 123 45678910", gender: "ذكر",  status: "نشط"          },
];

const seekers: UserRow[] = [
  { name: "دارلين روبرتسون", phone: "(+20) 123 45678910", gender: "ذكر",  status: "نشط"          },
  { name: "تيريزا كوبر",     phone: "(+20) 123 45678910", gender: "أنثى", status: "قيد الانتظار" },
  { name: "جيرالدين فيليبس", phone: "(+20) 123 45678910", gender: "ذكر",  status: "قيد الانتظار" },
  { name: "ناتالي ستيوارت",  phone: "(+20) 123 45678910", gender: "ذكر",  status: "قيد الانتظار" },
];

// ==================== Helpers ====================

const statusStyle: Record<UserStatus, string> = {
  "نشط":          "text-green-600  border-green-500",
  "قيد الانتظار": "text-orange-500 border-orange-400",
};

const StatusBadge = ({ status }: { status: UserStatus }) => (
  <span className={`px-6 py-1 rounded-full border text-sm font-medium ${statusStyle[status]}`}>
    {status}
  </span>
);

// ==================== Section Component ====================

interface SectionProps {
  title: string;
  count: number;
  rows: UserRow[];
  nameLabel: string;
  statusLabel: string;
  defaultOpen?: boolean;
}

const UserSection = ({ title, count, rows, nameLabel, statusLabel, defaultOpen = true }: SectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const [search, setSearch] = useState("");

  const filtered = rows.filter(
    (r) => r.name.includes(search) || r.phone.includes(search)
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center shrink-0 cursor-pointer hover:bg-gray-600 transition-colors"
        >
          {open ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
        </button>

        <div className="relative flex-1">
          <RiSearchLine className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن الاسم أو رقم الهاتف"
            className="w-full pr-9 pl-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#418FBF] text-right"
          />
        </div>

        <h2 className="text-lg font-bold text-gray-800 shrink-0">
          {title} ({count})
        </h2>
      </div>

      {/* Table */}
      {open && (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-b border-gray-100">
              <th className="text-right py-3 px-5 font-semibold text-gray-500">{statusLabel}</th>
              <th className="text-right py-3 px-5 font-semibold text-gray-500">النوع</th>
              <th className="text-right py-3 px-5 font-semibold text-gray-500">رقم الهاتف</th>
              <th className="text-right py-3 px-5 font-semibold text-gray-500">{nameLabel}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-gray-50 transition-colors ${
                  i % 2 === 1 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-4 px-5">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-4 px-5 text-gray-600">{row.gender}</td>
                <td className="py-4 px-5 text-gray-600">{row.phone}</td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-gray-700 font-medium">{row.name}</span>
                    <img src={avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  </div>
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

const Users = () => (
  <DashboardLayout>
    <div className="flex flex-col gap-5">
      <UserSection
        title="المتطوعون"
        count={10}
        rows={volunteers}
        nameLabel="اسم المتطوع"
        statusLabel="الحالة"
        defaultOpen={false}
      />
      <UserSection
        title="الباحثون"
        count={3}
        rows={seekers}
        nameLabel="اسم الباحث"
        statusLabel="الطلبات الحالية"
        defaultOpen={true}
      />
    </div>
  </DashboardLayout>
);

export default Users;
