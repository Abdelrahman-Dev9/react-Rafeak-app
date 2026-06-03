import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Spinner } from "@/components/ui/spinner";
import UserSection from "@/components/users/UserSelection";
import { useGetUsersQuery } from "@/redux/service/users/usersApi";

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
