import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen mx-auto bg-dashboard">
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full min-h-screen bg-dashboard relative">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}
