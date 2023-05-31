import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <div className=" w-full min-h-screen text-gray-900 bg-gray-50 flex">
      <SideBar />
      <div className=" grow">
        <Navbar />
      </div>
    </div>
  );
};

export default Dashboard;
