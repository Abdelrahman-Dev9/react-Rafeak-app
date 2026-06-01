import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import avatar from "../assets/avatar.png";

// ==================== Data ====================

type Status = "تم الاكتمال" | "قيد الانتظار" | "تم الالغاء" | "قيد التأكيد";

interface TrackingItem {
  id: string;
  date: string;
  status: Status;
  volunteer: {
    name: string;
    email: string;
    phone: string;
    birthdate: string;
    gender: string;
  };
  seeker: {
    name: string;
    email: string;
    phone: string;
    birthdate: string;
    gender: string;
  };
  injury: string;
  helpType: string;
}

const trackingItems: TrackingItem[] = [
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "تم الاكتمال",
    volunteer: {
      name: "محمد عبدالعاطي",
      email: "Mostafa@gmail.com",
      phone: "+966 12345678",
      birthdate: "10/30/2024",
      gender: "ذكر",
    },
    seeker: {
      name: "محمد عبدالعاطي",
      email: "Mostafa@gmail.com",
      phone: "+966 12345678",
      birthdate: "10/30/2024",
      gender: "ذكر",
    },
    injury: "إصابة في قدمه اليسرى",
    helpType: "أحتاج مساعدة للوصول إلى قائمة المحاضرات في مبنى العلوم",
  },
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "تم الاكتمال",
    volunteer: {
      name: "يوسف شاهين",
      email: "youssef@gmail.com",
      phone: "+966 98765432",
      birthdate: "05/12/1995",
      gender: "ذكر",
    },
    seeker: {
      name: "يوسف شاهين",
      email: "youssef@gmail.com",
      phone: "+966 98765432",
      birthdate: "05/12/1995",
      gender: "ذكر",
    },
    injury: "إصابة في الكتف الأيمن",
    helpType: "أحتاج مساعدة للتنقل داخل الحرم الجامعي",
  },
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "قيد الانتظار",
    volunteer: {
      name: "محمود عبد الفتاح",
      email: "mahmoud@gmail.com",
      phone: "+966 11122233",
      birthdate: "08/20/1998",
      gender: "ذكر",
    },
    seeker: {
      name: "محمود عبد الفتاح",
      email: "mahmoud@gmail.com",
      phone: "+966 11122233",
      birthdate: "08/20/1998",
      gender: "ذكر",
    },
    injury: "كسر في الذراع",
    helpType: "أحتاج مساعدة لحمل الكتب",
  },
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "تم الالغاء",
    volunteer: {
      name: "سارة أحمد",
      email: "sara@gmail.com",
      phone: "+966 55544433",
      birthdate: "02/14/1999",
      gender: "أنثى",
    },
    seeker: {
      name: "سارة أحمد",
      email: "sara@gmail.com",
      phone: "+966 55544433",
      birthdate: "02/14/1999",
      gender: "أنثى",
    },
    injury: "إصابة في الركبة",
    helpType: "أحتاج مساعدة للصعود إلى الطابق الثاني",
  },
  {
    id: "#29312BA",
    date: "14/9/2023",
    status: "قيد التأكيد",
    volunteer: {
      name: "أحمد خالد",
      email: "ahmed@gmail.com",
      phone: "+966 77766655",
      birthdate: "11/05/2000",
      gender: "ذكر",
    },
    seeker: {
      name: "أحمد خالد",
      email: "ahmed@gmail.com",
      phone: "+966 77766655",
      birthdate: "11/05/2000",
      gender: "ذكر",
    },
    injury: "صعوبة في الحركة",
    helpType: "أحتاج مساعدة للوصول إلى المكتبة",
  },
];

// ==================== Helpers ====================

const statusStyle: Record<Status, string> = {
  "تم الاكتمال": "text-green-600  border-green-500",
  "قيد الانتظار": "text-orange-500 border-orange-400",
  "تم الالغاء": "text-red-500    border-red-400",
  "قيد التأكيد": "text-amber-600  border-amber-400",
};

const StatusBadge = ({ status }: { status: Status }) => (
  <span
    className={`px-3 py-0.5 rounded-full border text-xs font-medium ${statusStyle[status]}`}
  >
    {status}
  </span>
);

const FieldRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2 py-2 border-b border-gray-50">
    <span className="text-gray-500 text-sm">{label}:</span>
    <span className="text-gray-700 text-sm font-medium">{value}</span>
  </div>
);

// ==================== Main ====================

const TrackingList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = trackingItems[selectedIndex];

  return (
    <DashboardLayout>
      <div className="flex gap-4 h-full">
        {/* ---- Left: List Panel ---- */}
        <div className="w-64 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden shrink-0">
          {/* Title */}
          <div className="px-4 pt-4 pb-2">
            <h2 className="font-bold text-gray-800 text-right mb-3">
              قائمة التتبع
            </h2>
            {/* Search + Filter */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer">
                <MdFilterList size={18} />
              </button>
              <div className="relative flex-1">
                <RiSearchLine className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="ابحث عن الكود"
                  className="w-full pr-7 pl-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#418FBF]"
                />
              </div>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {trackingItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`w-full px-4 py-3 text-right transition-colors cursor-pointer ${
                  selectedIndex === i ? "bg-[#EEECF2]" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">{item.date}</span>
                  <span className="text-sm font-semibold text-[#418FBF]">
                    ID {item.id}
                  </span>
                </div>
                <StatusBadge status={item.status} />
              </button>
            ))}
          </div>
        </div>
        {/* ---- Right: Detail Panel ---- */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Header */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <StatusBadge status={selected.status} />
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">رقم الطلب:</span>
              <span className="font-bold text-[#418FBF]">ID {selected.id}</span>
            </div>
          </div>

          {/* Volunteer Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-right font-semibold text-gray-700 mb-4">
              بيانات المتطوع
            </h3>
            <div className="flex items-start gap-5">
              <img
                src={avatar}
                alt="volunteer"
                className="w-28 h-28 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1">
                <FieldRow label="اسم المتطوع" value={selected.volunteer.name} />
                <FieldRow
                  label="البريد الإلكتروني"
                  value={selected.volunteer.email}
                />
                <FieldRow
                  label="هاتف المستخدم"
                  value={selected.volunteer.phone}
                />
                <div className="flex gap-6">
                  <FieldRow label="الجنس" value={selected.volunteer.gender} />
                  <FieldRow
                    label="تاريخ الميلاد"
                    value={selected.volunteer.birthdate}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Help Seeker Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-right font-semibold text-gray-700 mb-4">
              بيانات الباحث عن مساعده
            </h3>
            <div className="flex items-start gap-5">
              <img
                src={avatar}
                alt="seeker"
                className="w-28 h-28 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1">
                <FieldRow label="اسم الباحث" value={selected.seeker.name} />
                <FieldRow
                  label="البريد الإلكتروني"
                  value={selected.seeker.email}
                />
                <FieldRow label="هاتف المستخدم" value={selected.seeker.phone} />
                <div className="flex gap-6">
                  <FieldRow label="الجنس" value={selected.seeker.gender} />
                  <FieldRow
                    label="تاريخ الميلاد"
                    value={selected.seeker.birthdate}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <FieldRow label="الإصابة" value={selected.injury} />
            <FieldRow label="نوع المساعدة" value={selected.helpType} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrackingList;
