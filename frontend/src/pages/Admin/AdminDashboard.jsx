import "./admindash.scss";
import AdminSidebar from "./AdminSidebar";
import AdminMain from "./AdminMain";

const AdminDashboard = () => {
  return (
    <section className="admindashboard">
      <AdminSidebar />
      <AdminMain />
    </section>
  );
};

export default AdminDashboard;
