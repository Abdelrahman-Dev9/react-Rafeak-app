import { useState } from "react";
import Trips from "./Trips";
import UserInf from "./UserInf";

const UserDetails = ({ selectedRow, setSelectedRow }) => {
  const [activeTab, setActiveTab] = useState("info");

  if (!selectedRow) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 "
        onClick={() => setSelectedRow(null)}
      />

      {/* Modal */}
      <div className="relative bg-white w-[700px] rounded-2xl shadow-xl p-8 z-10">
        {/* Close Button */}
        <button
          onClick={() => setSelectedRow(null)}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#CC1D1B] hover:bg-[#CC1D1B] flex items-center justify-center text-white text-sm cursor-pointer"
        >
          ✕
        </button>
        {/* Title */}
        <h2
          className="text-center text-[24px] font-semibold text-[#418FBF] mb-5 dir-rtl mt-8"
          dir="rtl"
        >
          {selectedRow.name}{" "}
          <span className="text-[#418FBF] text-[24px] font-normal">
            (متطوع)
          </span>
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 rounded-full p-1 mb-6 border border-gray-200 p-2">
          <button
            onClick={() => setActiveTab("info")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === "info"
                ? "bg-[#418FBF] text-[#ECEEF3] shadow"
                : "text-[#418FBF] border border-[#E5E3EB]"
            }`}
          >
            معلومات المستخدم
          </button>
          <button
            onClick={() => setActiveTab("trips")}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeTab === "trips"
                ? "bg-[#418FBF] text-[#ECEEF3] shadow"
                : "text-[#418FBF] border border-[#E5E3EB]"
            }`}
          >
            سجل الرحلات
          </button>
        </div>

        {/* Info Panel */}
        {activeTab === "info" && <UserInf selectedRow={selectedRow} />}
        {/* Trips Panel */}
        {activeTab === "trips" && <Trips trips={selectedRow.trips} onBlock />}
      </div>
    </div>
  );
};

export default UserDetails;
