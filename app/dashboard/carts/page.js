import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const Carts = () => {
  return (
    <>
      <Breadcrumb pageName="Carts" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <h1>Ini di halaman Cart</h1>
        </div>
      </div>
    </>
  );
};

export default Carts;
