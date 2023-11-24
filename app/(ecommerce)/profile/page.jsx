import SidebarCustomer from "@/components/Sidebar/SidebarCustomer";
import ProfilePage from "./ProfilePage";
const Profile = () => {
	return (
		<>
			<div className="flex items-start mt-10">
				<div className="w-1/5 border-none rounded-lg pb-8 box text-[#212121]">
					<SidebarCustomer />
				</div>
				<div className="w-4/5 mb-5 text-[#212121]">
					<h3 className="font-bold ml-6 mb-5 text-xl">Profile</h3>
					<div className="box-2">
						<ProfilePage />
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;