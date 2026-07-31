import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notice from "./components/Notice";
export const metadata: Metadata={title:{default:"Thoddoo Sun Sky Inn | Boutique Stay in Thoddoo",template:"%s | Thoddoo Sun Sky Inn"},description:"A warm boutique guesthouse in Thoddoo, Maldives with comfortable rooms, breakfast, island experiences and direct booking.",icons:{icon:"/images/favicon.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Notice/><Header/><main>{children}</main><Footer/></body></html>}
