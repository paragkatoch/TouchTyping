import Link from "next/link";
import styles from "./styles.module.scss";

export default function Header() {
	return (
		<header className={styles.header}>
			<Link href="/" className="logo">
				Touch-Typing
			</Link>
		</header>
	);
}
