import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCartDetail from "@/app/dashboard/cart-details/TableCartDetail";

const Carts = async () => {
  return (
    <>
      <Breadcrumb pageName="Cart-details" />

      <div className="flex flex-col gap-10">
        <TableCartDetail />
      </div>
    </>
  );
};

export default Carts;
