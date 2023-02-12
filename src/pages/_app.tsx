import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "@next/font/google";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { pages } from "@/util";

const openSans = Open_Sans({
	weight: ["400", "500", "600"],
	subsets: ["latin"],
	variable: "--open-sans",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WrapWithProvider>
			<main className={openSans.variable}>
				<div className="app_container">
					<Component {...pageProps} />
				</div>
			</main>
		</WrapWithProvider>
	);
}

// wrap redux provider on trainer page
function WrapWithProvider({ children }: { children: ReactNode }) {
	const { route } = useRouter();

	return route.startsWith(pages.trainer) ? (
		<Provider store={store}>{children}</Provider>
	) : (
		<>{children}</>
	);
}
