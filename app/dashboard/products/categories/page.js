"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCategory from "../../../../components/Tables/TableCategory";

const Categories = () => {
  return (
    <>
      <Breadcrumb pageName="Categories" />

      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <TableCategory />
        </div>
      </div>
    </>
  );
};

export default Categories;
