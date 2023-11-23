import SidebarUser from "../../../components/Sidebar/SidebarUser";
import ProfileMain from "./ProfileMain";

const ProfilePage = () => {
	return (
		<>
			<div className="flex items-start mt-10 text-[#212121]">
				<div className="w-1/5 border-none rounded-lg pb-8 box ">
					<SidebarUser />
				</div>
				<div className="w-4/5 mb-5 ">
					<h3 className="font-bold ml-6 mb-5 text-xl">Profile</h3>
					<div className="box-2">
						<ProfileMain />
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfilePage;