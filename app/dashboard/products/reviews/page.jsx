import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableReviewProducts from "@/app/dashboard/products/reviews/TableReviewProducts";
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