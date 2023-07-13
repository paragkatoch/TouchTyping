import Link from "next/link";
import styles from "./styles.module.scss";
import KeyboardButton from "../KeyboardButton";

export default function Header() {
	return (
		<header className={styles.header}>
			<KeyboardButton hidden />

			<Link href="/" className="logo">
				Touch-Typing
			</Link>

			<KeyboardButton
				text="history"
				onClick={() => {
					window.location.href = "/history";
				}}
			/>
		</header>
	);
}
