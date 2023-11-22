import "../satoshi.css";
import "../globals.css";
import ProfilePage from "../../components/Profile/ProfilePage";

export const metadata = {
	title: "Profile | Streetflow",
};

const Profile = () => {
	return (
		<>
			<div className="container mx-auto px-4 max-h-screen">
				<ProfilePage />
			</div>
		</>
	);
};

export default Profile;
