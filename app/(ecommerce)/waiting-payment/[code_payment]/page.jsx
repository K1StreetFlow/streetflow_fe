import Link from "next/link";
import Image from "next/image";
import SidebarCustomer from "@/components/Sidebar/SidebarCustomer";
async function getPaymentById(code_payment) {
	const res = await fetch(`http://localhost:8000/api/payments/status-order/${code_payment}`, {
		next: {
			revalidate: 0,
		},
	});
	return res.json();
}

async function updatePayemnt(code_payment) {
	await fetch(`http://localhost:8000/api/payments/update-status/${code_payment}`, {
		next: {
			revalidate: 0,
		},
	});
}

const page = async ({ params }) => {
	const data = await getPaymentById(params.code_payment);
	const updatedStatus = await updatePayemnt(params.code_payment);

	return (
		<div className="flex items-start mt-10">
			<div className="w-1/5 ml-7 border-none rounded-lg pb-8 box text-[#212121]">
				<SidebarCustomer />
			</div>
			<div className=" ml-5 box-2 mr-8 shadow-lg">
				<div>
					<h3 className="font-bold ml-6 mb-5 text-xl text-[#212121]">Waiting Payment</h3>
				</div>
				<div className="flex">
					<div>
						<div className="flex flex-col">
							<div className="flex flex-row">
								<hr />
								<table className="table w-full mx-auto py-15">
									<thead>
										<tr>
											<th className="text-left text-md font-bold text-black">VA TYPE</th>
											<th className="text-md text-center font-bold text-black ">No. Virtual Account</th>
											<th className="text-center text-md font-bold text-black">Status Payment</th>
											<th className=" text-right text-md font-bold text-black">Total Pembayaran</th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td className="text-md text-left text-black font-bold text uppercase ">{data.va_type}</td>
											<td className="text-center font-bold text-md text-black">{data.va_number}</td>
											<td className="text-center font-bold text-md text-black">
												<p
													className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-lg font-medium ${
														data.status_payment === "Success"
															? "text-success bg-success"
															: data.status_payment === "Failed"
															? "text-danger bg-danger"
															: "text-warning bg-warning"
													}`}
												>
													{data.status_payment}
												</p>
											</td>
											<td className="text-right font-bold text-xl text-black">
												Rp {data.total_payment.toLocaleString("id-ID")}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div className="flex justify-end my-20 ">
							<div className="flex flex-col  items-end">
								<div className="flex flex-row mt-5">
									<Link href={data.pdf_url} target="_blank">
										<button className="btn btn-outline btn-primary text-white ml-8">Cara Pembayaran</button>
									</Link>

									<button className="btn btn-primary text-white ml-8">
										<Link href={"/order"}>Order List</Link>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default page;