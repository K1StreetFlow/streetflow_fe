import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableReviewProducts from "@/components/Dashboard/Reviews/TableReviewProducts";
const Reviews = () => {
  return (
    <>
      <Breadcrumb pageName="Reviews" />

      <div className="flex flex-col gap-10">
        <TableReviewProducts />
      </div>
    </>
  );
};

export default Reviews;