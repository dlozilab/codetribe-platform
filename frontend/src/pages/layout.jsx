import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";


export default function Layout() {
  return (
    <>
      <Navbar />
      <section style={{minHeight:"100%",width:"100%",padding:"70px 2% 2% 2%"}}>
        <Outlet />
      </section>
    </>
  );
}
