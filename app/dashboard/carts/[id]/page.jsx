import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const Details = () => {
  return (
    <>
      <Breadcrumb pageName="Details" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 ">
        <div className="flex flex-col gap-7.5 ">
          <h1>Ini di halaman Cart Detail asd</h1>
          <div className="mx-auto p-8 text-warning bg-pri">Margin</div>
          <h2>sizeing</h2>
          <div className="w-50 h-32 bg-primary">Kotak 1</div>
        </div>
      </div>
    </>
  );
};

export default Details;
