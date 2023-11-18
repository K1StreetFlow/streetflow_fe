"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";

const Products = () => {
  return (
    <>
      <Breadcrumb pageName="List-Products" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <TableTwo/>
        </div>
      </div>
    </>
  );
};

export default Products;
