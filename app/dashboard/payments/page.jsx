import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TablePayment from "@/components/Dashboard/Payment/TablePayment";

// import { fetchDataPayment } from "@/app/dashboard/payments/api/fetchDataPayment";

import { fetchData } from "@/app/api/payments/api";

const Payments = async () => {
  const { data } = await fetchData();
  return (
    <>
      <Breadcrumb pageName="Payments" />

      <div className="flex flex-col gap-10">
        <TablePayment data={data} />
      </div>
    </>
  );
};

export default Payments;
