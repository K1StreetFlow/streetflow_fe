import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCart from "@/app/dashboard/carts/TableCart";

const Carts = async () => {
  return (
    <>
      <Breadcrumb pageName="Carts" />

      <div className="flex flex-col gap-10">
        <TableCart />
      </div>
    </>
  );
};

export default Carts;
