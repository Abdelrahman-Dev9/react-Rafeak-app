import { useState } from "react";

// ==================== Mock Data ====================
const mockTrips = [
  {
    id: "29312BA",
    date: "14/9/2023",
    status: "pending",
    requesterName: "أحمد علي",
    requesterPhone: "+966 123 4567891",
    injury: "أصابة ف قدمه اليسري",
    helpType: "أحتاج مساعدة للوصول إلى قاعة المحاضرات في مبنى العلوم.",
  },
  {
    id: "29312BA",
    date: "14/9/2023",
    status: "completed",
    requesterName: null,
    requesterPhone: null,
    injury: null,
    helpType: null,
  },
] as const;

// ==================== Types ====================
type TripStatus = "pending" | "completed";

type Trip = {
  id: string;
  date: string;
  status: TripStatus;
  requesterName: string | null;
  requesterPhone: string | null;
  injury: string | null;
  helpType: string | null;
};

type Props = {
  trips?: Trip[];
  onBlock?: () => void;
};

// ==================== Status Config ====================
const statusConfig: Record<
  TripStatus,
  {
    label: string;
    border: string;
    text: string;
  }
> = {
  pending: {
    label: "قيد التنفيذ",
    border: "border-blue-400",
    text: "text-blue-500",
  },
  completed: {
    label: "تم الاكتمال",
    border: "border-green-400",
    text: "text-green-500",
  },
};

// ==================== Component ====================
const Trips = ({ trips = mockTrips as unknown as Trip[], onBlock }: Props) => {
  const [search, setSearch] = useState<string>("");

  const filtered = trips.filter((t) =>
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div dir="rtl" className="w-full px-2 py-4">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-blue-500 text-right mb-5">
        سجل الرحلات ({trips.length})
      </h2>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-5">
        {/* Filter button */}
        <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition flex-shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-gray-500"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
        </button>

        {/* Search */}
        <div className="flex-1 flex items-center border border-gray-200 rounded-xl px-4 h-12 gap-2 bg-white">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-gray-400 flex-shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>

          <input
            type="text"
            placeholder="ابحث عن الكود"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-right bg-transparent outline-none placeholder-gray-400"
          />
        </div>
      </div>

      <hr className="border-gray-100 mb-4" />

      {/* Trip Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((trip, i) => {
          const cfg = statusConfig[trip.status];
          const expanded = !!trip.requesterName;

          return (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-4 pb-3">
                <button
                  className={`border ${cfg.border} ${cfg.text} rounded-full px-8 py-2 text-sm font-medium bg-white hover:bg-gray-50 transition min-w-[160px]`}
                >
                  {cfg.label}
                </button>

                <div className="text-right">
                  <p className="text-base font-semibold text-gray-800">
                    ID #{trip.id}
                  </p>
                  <p className="text-sm text-gray-400">{trip.date}</p>
                </div>
              </div>

              {/* Expanded */}
              {expanded && (
                <>
                  <hr className="border-gray-100 mx-5" />
                  <div className="px-5 py-4 grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="col-span-2 text-right">
                      <p className="text-base font-semibold text-gray-800">
                        معلومات الطلب
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-800 mb-1">
                        اسم الباحث
                      </p>
                      <p className="text-sm text-gray-600">
                        {trip.requesterName}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-800 mb-1">
                        هاتف الباحث
                      </p>
                      <p className="text-sm text-gray-600">
                        {trip.requesterPhone}
                      </p>
                    </div>

                    <div className="col-span-2 text-right">
                      <p className="text-sm font-bold text-gray-800 mb-1">
                        إصابة
                      </p>
                      <p className="text-sm text-gray-600">{trip.injury}</p>
                    </div>

                    <div className="col-span-2 text-right">
                      <p className="text-sm font-bold text-gray-800 mb-1">
                        نوع المساعدة؟
                      </p>
                      <p className="text-sm text-gray-600">{trip.helpType}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Block Button */}
      <div className="flex justify-start mt-8">
        <button
          onClick={onBlock}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl border border-gray-200 text-gray-700 text-base hover:bg-gray-50 transition"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
          حظر المستخدم
        </button>
      </div>
    </div>
  );
};

export default Trips;
