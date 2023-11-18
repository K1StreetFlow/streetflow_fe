import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCart from "@/components/Dashboard/Cart/TableCart";

import { fetchDataCart } from "@/app/api/carts/api";

const Carts = async () => {
  const { data } = await fetchDataCart.getAllData();

  return (
    <>
      <Breadcrumb pageName="Carts" />

      <div className="flex flex-col gap-10">
        <TableCart data={data} />
      </div>
    </>
  );
};

export default Carts;
