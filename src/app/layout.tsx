import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Navbar } from "./components/navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/Modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "./components/Modals/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AirBnb",
	description: "AirBnb Clone",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<head>
			<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={font.className}>
				<ToasterProvider />
				<RegisterModal />
				<LoginModal />
				<RentModal />
				<Navbar currentUser={currentUser} />
				
				{children}
			</body>
		</html>
	);
}
