import "../../satoshi.css";
import "../../globals.css";
import WaitingPayment from "@/components/Order/WaitingPayment";

const WaitingPayments = () => {
	return (
		<>
			<div className="container mx-auto px-4 max-h-screen">
				<WaitingPayment />
			</div>
		</>
	);
};

export default WaitingPayments;
