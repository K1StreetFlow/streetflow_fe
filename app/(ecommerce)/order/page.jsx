import "../../satoshi.css";
import "../../globals.css";
import OrderTransaction from "./OrderTransaction";

export const metadata = {
	title: "Order | Streetflow",
};

const DetailTrasanksi = () => {
	return (
		<>
			<div className="container mx-auto px-4">
				<OrderTransaction />
			</div>
		</>
	);
};

export default DetailTrasanksi;