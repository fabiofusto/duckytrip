import Navbar from "../components/navbar/Navbar";
import { Nunito } from "next/font/google";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import "../styles/globals.css";
import { PaddingChildren } from "@/styled-components/Padding.styled";
import Footer from "@/components/footer/Footer";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "DuckyTrip",
  description: "The best travel solutions for you!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "var(--backgroundSecondaryColor)",
        }}
        className={font.className}
      >
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <PaddingChildren>{children}</PaddingChildren>
        <Footer />
      </body>
    </html>
  );
}
