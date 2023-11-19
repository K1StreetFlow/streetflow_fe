import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TablePayment from "@/app/dashboard/payments/TablePayment";

const Payments = async () => {
  return (
    <>
      <Breadcrumb pageName="Payments" />

      <div className="flex flex-col gap-10">
        <TablePayment />
      </div>
    </>
  );
};

export default Payments;
