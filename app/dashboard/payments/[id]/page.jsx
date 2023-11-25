import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { formatDate } from "@/app/utils/formatDate";

async function getPaymentById(id) {
	const res = await fetch(`http://localhost:8000/api/payments/${id}`, {
		withCredentials: true,
		next: {
			revalidate: 0,
		},
	});
	return res.json();
}

const Payment = async ({ params }) => {
	const { data } = await getPaymentById(params.id);

	console.log(data);

	return (
		<>
			<Breadcrumb pageName="Payment" />

			<div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 ">
				<h2 className="mb-5 font-bold text-xl">Customer Detail</h2>
				<div className="flex flex-col gap-7.5">
					<div className="flex flex-row gap-5.5 ">
						<div className="w-full sm:w-1/2">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
								Full Name
							</label>
							<div className="relative">
								<h3>{data.cart.user_customer.fullname}</h3>
							</div>
						</div>

						<div className="w-full sm:w-1/2">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
								Username
							</label>

							<h3>{data.cart.user_customer.username}</h3>
						</div>
						<div className="w-full sm:w-1/2">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
								Phone Number
							</label>

							<h3>{data.cart.user_customer.phone_number}</h3>
						</div>
					</div>
					<div className="flex flex-col gap-5.5 sm:flex-row">
						<div className="w-[32%]">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
								Gender
							</label>
							<div className="relative">
								<h3>{data.cart.user_customer.gender}</h3>
							</div>
						</div>
						<div className="w-110">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
								Email
							</label>
							<div className="relative">
								<h3>{data.cart.user_customer.email}</h3>
							</div>
						</div>
					</div>
				</div>
				<hr className="mt-10" />
				<h2 className="mb-5 mt-10 font-bold text-xl">Payment Detail</h2>
				<div className="flex flex-col gap-7.5 mb-20">
					<div className="flex flex-row gap-5.5 ">
						<div className="w-full sm:w-1/2">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
								Payment Method
							</label>
							<div className="relative">
								<h3>{data.method_payment}</h3>
							</div>
						</div>

						<div className="w-full sm:w-1/2">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
								Total Payment
							</label>

							<h3>Rp {data.total_payment}</h3>
						</div>
						<div className="w-full sm:w-1/2">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="email">
								Total Payment
							</label>

							<h3>Rp {data.total_payment}</h3>
						</div>
						<div className="w-full sm:w-1/2">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
								Status Payment
							</label>

							<p
								className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
									data.status_payment === "Success"
										? "text-success bg-success"
										: data.status_payment === "Failed"
										? "text-danger bg-danger"
										: "text-warning bg-warning"
								}`}
							>
								{data.status_payment}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-5.5 sm:flex-row mt-5">
						<div className="w-[32%]">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
								Date Payment
							</label>
							<div className="relative">
								<h3>{formatDate(data.date_payment)}</h3>
							</div>
						</div>
						<div className="w-1/3">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
								Code Payment
							</label>
							<div className="relative">
								<h3>{data.code_payment}</h3>
							</div>
						</div>
						<div className="w-1/3">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
								Virtual Account Type
							</label>
							<div className="relative">
								<h3>{data.va_type}</h3>
							</div>
						</div>
						<div className="w-1/3">
							<label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
								Virtual Account
							</label>
							<div className="relative">
								<h3>{data.va_number}</h3>
							</div>
						</div>
					</div>
				</div>
				<div>
					<button></button>
				</div>
			</div>
		</>
	);
};

export default Payment;
