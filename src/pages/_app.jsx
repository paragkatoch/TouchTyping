import "@/styles/globals.css";
import { Open_Sans } from "@next/font/google";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { pages } from "@/lib/util";

const openSans = Open_Sans({
	weight: ["400", "500", "600"],
	subsets: ["latin"],
	variable: "--open-sans",
});

export default function App({ Component, pageProps }) {
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
function WrapWithProvider({ children }) {
	const { route } = useRouter();

	return route.startsWith(pages.trainer) ? (
		<Provider store={store}>{children}</Provider>
	) : (
		<>{children}</>
	);
}
