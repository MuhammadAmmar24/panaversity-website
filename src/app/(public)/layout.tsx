import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export default function Layout({ children, modal }: { children: React.ReactNode;  modal: React.ReactNode; }) {
  return (
    <>
      {" "}
      <Navbar />
      {children}
      {modal}
      <Footer />
    </>
  );
}
