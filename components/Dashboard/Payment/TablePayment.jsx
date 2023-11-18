"use client";
import ButtonDelete from "@/components/Dashboard/ButtonDelete";
import ButtonDetail from "@/components/Dashboard/ButtonDetail";
import ButtonEdit from "@/components/Dashboard/ButtonEdit";
import formatDate from "@/app/utils/formatDate";
// import { deleteDataPayment } from "@/app/api/payments/api";
import Image from "next/image";

const TablePayment = ({ data }) => {
  const handleDeletePayment = async () => {
    try {
      confirm("Are you sure want to delete this payment?");
      // const response = await deleteDataPayment(id);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Code Payment
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Method Payment
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Total Payment
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((payment, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {payment.code_payment}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {payment.method_payment}
                  </h5>
                  <p className="text-sm">{formatDate(payment.date_payment)}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    Rp {payment.total_payment.toLocaleString("id-ID")}
                  </p>
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      payment.status_payment === "Success"
                        ? "text-success bg-success"
                        : payment.status_payment === "Failed"
                        ? "text-danger bg-danger"
                        : "text-warning bg-warning"
                    }`}
                  >
                    {payment.status_payment}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <ButtonDetail
                      title={"Create Cart"}
                      route={`payments/${payment.id}`}
                    />
                    <ButtonEdit />
                    <ButtonDelete handleDelete={handleDeletePayment} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePayment;
