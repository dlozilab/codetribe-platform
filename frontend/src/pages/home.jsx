import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      <Navbar />
      <main style={{ flex: 1 }}>
        <section>HOME PAGE</section>
      </main>
    </div>
  );
}