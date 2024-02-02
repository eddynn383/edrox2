import { Sidebar } from "@/module/Sidebar";
import Header from "@/module/Header";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="layout layout--two-cols">
            <div className="layout_left">
                <Sidebar />
            </div>
            <div className="layout_right">
                <Header />
                {children}
            </div>
        </div>
    );
}
 
export default DashboardLayout;