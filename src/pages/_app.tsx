import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "@next/font/google";

const openSans = Open_Sans({
	weight: ["400", "500", "600"],
	subsets: ["latin"],
	variable: "--open-sans",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={openSans.variable}>
			<div className="app_container">
				<Component {...pageProps} />
			</div>
		</main>
	);
}
