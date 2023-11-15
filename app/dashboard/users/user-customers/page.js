import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const UserCustomers = () => {
  return (
    <>
      <Breadcrumb pageName="UserCustomers" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <h1>Ini di halaman User Customer</h1>
        </div>
      </div>
    </>
  );
};

export default UserCustomers;
