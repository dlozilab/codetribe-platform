import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <section style={{height:"100%",width:"100%",padding:"2%"}}>
        <Outlet />
      </section>
      <Footer />
    </>
  );
}
