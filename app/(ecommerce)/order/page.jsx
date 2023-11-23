import "@/app/satoshi.css";
import "@/app/globals.css";
import OrderTransaction from "@/components/Order/OrderTransaction";

export const metadata = {
  title: "Order | Streetflow",
};

const DetailTrasanksi = () => {
  return (
    <>
      <div className="container mx-auto px-4 max-h-screen">
        <OrderTransaction />
      </div>
    </>
  );
};

export default DetailTrasanksi;
