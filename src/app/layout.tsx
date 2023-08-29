import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Navbar } from "./components/navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/Modals/LoginModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AirBnb",
	description: "AirBnb Clone",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ToasterProvider />
				<RegisterModal />
				<LoginModal />
				<Navbar />
				{children}
			</body>
		</html>
	);
}
