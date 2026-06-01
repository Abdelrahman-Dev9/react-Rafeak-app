import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetOrderByIdQuery,
  useGetOrdersQuery,
} from "@/redux/service/TrakingList/trackinglistApi";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import avatar from "../assets/avatar.png";

// ==================== Helpers ====================

const statusStyle: Record<string, string> = {
  "تم الاكتمال": "text-[#14AE5C]  border-[#14AE5C] text-[12px]",
  "قيد الانتظار": "text-[#BF6A02] border-[#BF6A02] text-[12px]",
  "تم الالغاء": "text-[#CC1D1B] border-[#CC1D1B] text-[12px]",
  "قيد التنفيذ": "text-[#007AFF] border-[#007AFF] text-[12px]",
};

const statusMap: Record<string, string> = {
  completed: "تم الاكتمال",
  pending: "قيد الانتظار",
  cancelled: "تم الالغاء",
  in_progress: "قيد التنفيذ",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`px-3 py-0.5 rounded-full border text-xs font-medium ${
      statusStyle[status] || ""
    }`}
  >
    {status || <Spinner />}
  </span>
);

const FieldRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-center gap-2 py-2 border-b border-gray-50">
    <span className="text-[#111827] text-[14px] font-semibold">{label}:</span>
    <span className="text-[#374151] text-[13px] font-medium">
      {value?.trim() ? value : <Spinner />}
    </span>
  </div>
);

// ==================== Main ====================

const TrackingList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: ordersResponse, isLoading: isOrdersLoading } =
    useGetOrdersQuery({});

  const { data: orderResponse } = useGetOrderByIdQuery(
    "69dac4caae4ce9d0a3c17257"
  );
  // console.log(orderResponse);

  const orders = ordersResponse?.orders ?? [];
  const selected = orders[selectedIndex] || null;

  return (
    <DashboardLayout>
      <div className="flex gap-4 h-full">
        {/* ---- Left: List Panel ---- */}
        <div className="w-64 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden shrink-0 w-[350px]">
          <div className="px-4 pt-4 pb-2">
            <h2 className="font-semibold text-[20px] text-[#418FBF] text-right mb-3">
              قائمة التتبع
            </h2>

            <div className="flex items-center gap-2 mt-6">
              <div className="relative flex-1">
                <RiSearchLine className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="ابحث عن الكود"
                  className="w-full pr-7 pl-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#418FBF]"
                />
              </div>
              <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer">
                <MdFilterList size={18} />
              </button>
            </div>

            <hr className="mt-2" />
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {isOrdersLoading ? (
              <div className="flex justify-center items-center h-full">
                <Spinner className="w-8 h-8" />
              </div>
            ) : orders.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                No orders found
              </div>
            ) : (
              orders.map((item, i) => (
                <button
                  key={item._id}
                  onClick={() => setSelectedIndex(i)}
                  className={`w-full px-4 py-3 text-right transition-colors cursor-pointer flex items-center justify-between ${
                    selectedIndex === i ? "bg-[#EEECF2]" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[14px] font-semibold text-[#000000DE] flex flex-row gap-1">
                      <span>{item._id}</span>
                      <span>ID</span>
                    </span>

                    <span className="text-[11px] text-[#000000B2]">
                      {item.createdAt ? (
                        new Date(item.createdAt).toLocaleDateString()
                      ) : (
                        <Spinner />
                      )}
                    </span>
                  </div>

                  <StatusBadge status={statusMap[item.status] || item.status} />
                </button>
              ))
            )}
          </div>
        </div>

        {/* ---- Right: Detail Panel ---- */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
              <StatusBadge
                status={
                  selected ? (
                    statusMap[selected.status] || selected.status
                  ) : (
                    <Spinner />
                  )
                }
              />

              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">رقم الطلب:</span>

                {selected ? (
                  <span className="font-bold text-[#418FBF]">
                    ID {selected._id}
                  </span>
                ) : (
                  <Spinner className="text-[#418FBF]" />
                )}
              </div>
            </div>

            <hr className="my-4" />

            {/* Volunteer */}
            <h3 className="text-right font-medium text-[#1E3A8A] mb-4 text-[15px]">
              بيانات المتطوع
            </h3>

            <div className="flex items-start gap-5">
              <img
                src={orderResponse?.order?.seeker?.profileImg || avatar}
                className="w-[250px] h-[288px] rounded-[10px] object-contain border border-gray-200 p-4"
              />

              <div className="flex-1 space-y-3">
                <div className="border rounded-[10px] p-3">
                  <FieldRow
                    label="اسم المتطوع"
                    value={
                      orderResponse?.order?.seeker?.firstName +
                        " " +
                        orderResponse?.order?.seeker?.lastName ||
                      selected?.volunteer?.name
                    }
                  />
                </div>

                <div className="border rounded-[10px] p-3">
                  <FieldRow
                    label="البريد الإلكتروني"
                    value={
                      orderResponse?.order?.seeker?.email ||
                      selected?.volunteer?.email
                    }
                  />
                </div>

                <div className="border rounded-[10px] p-3">
                  <FieldRow
                    label="هاتف المستخدم"
                    value={
                      orderResponse?.order?.seeker?.phone ||
                      selected?.volunteer?.phone
                    }
                  />
                </div>

                {/* 🔥 NEW FIELDS ADDED */}
                <div className="flex gap-3">
                  <div className="flex-1 border rounded-[10px] p-3">
                    <FieldRow
                      label="تاريخ الميلاد"
                      value={
                        orderResponse?.order?.seeker?.birthday ||
                        selected?.volunteer?.birthdate
                          ? new Date(
                              orderResponse?.order?.seeker?.birthday ||
                                selected?.volunteer?.birthdate
                            ).toLocaleDateString()
                          : ""
                      }
                    />
                  </div>

                  <div className="flex-1 border rounded-[10px] p-3">
                    <FieldRow
                      label="الجنس"
                      value={
                        orderResponse?.order?.seeker?.gender ||
                        selected?.volunteer?.gender
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seeker */}
            <h3 className="text-right font-medium text-[#1E3A8A] mb-4 mt-10 text-[15px]">
              بيانات الباحث عن مساعده
            </h3>

            <div className="flex items-start gap-5">
              <img
                src={avatar}
                className="w-[250px] h-[288px] rounded-[10px] object-contain border border-gray-200 p-4"
              />

              <div className="flex-1 space-y-3">
                <div className="border rounded-[10px] p-3">
                  <FieldRow
                    label="اسم الباحث"
                    value={
                      orderResponse?.order?.volunteer?.firstName +
                        " " +
                        orderResponse?.order?.volunteer?.lastName ||
                      selected?.volunteer?.name
                    }
                  />
                </div>

                <div className="border rounded-[10px] p-3">
                  <FieldRow
                    label="البريد الإلكتروني"
                    value={
                      orderResponse?.order?.volunteer?.email ||
                      selected?.volunteer?.email
                    }
                  />
                </div>

                {/* 🔥 NEW FIELDS ADDED */}
                <div className="border rounded-[10px] p-3">
                  <FieldRow
                    label="هاتف الباحث"
                    value={
                      orderResponse?.order?.volunteer?.phone ||
                      selected?.volunteer?.phone
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 border rounded-[10px] p-3">
                    <FieldRow
                      label="تاريخ الميلاد"
                      value={
                        orderResponse?.order?.volunteer?.birthday ||
                        selected?.volunteer?.birthdate
                          ? new Date(
                              orderResponse?.order?.volunteer?.birthday ||
                                selected?.volunteer?.birthdate
                            ).toLocaleDateString()
                          : ""
                      }
                    />
                  </div>

                  <div className="flex-1 border rounded-[10px] p-3">
                    <FieldRow
                      label="الجنس"
                      value={
                        orderResponse?.order?.volunteer?.gender ||
                        selected?.volunteer?.gender
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="border rounded-[10px] p-3">
              <FieldRow label="الإصابة" value={selected?.injury} />
            </div>

            <div className="border rounded-[10px] p-3 mt-5">
              <FieldRow label="نوع المساعدة" value={selected?.helpType} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrackingList;
