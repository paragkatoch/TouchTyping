import Keyboard from "@/components/Keyboard";
import styles from "@/styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";
import Blob from "../assets/blob.png";

export default function Home() {
	return (
		<main className={styles.home_container}>
			<header className={styles.header}>
				<p className="logo">Touch-Typing</p>
			</header>

			<main className={styles.content_container}>
				<section className={styles.reading_content}>
					<h1 className={styles.heading}>Hello and Welcome 👋</h1>

					<p className={styles.desc}>
						Introducing a simple keyboard trainer for enhancing your touch
						typing skills. This is just the beginning, additional features will
						be added in the future.
					</p>

					<Link href="/profile">Try it out</Link>
				</section>
				<section className={styles.keyboard}>
					<Image src={Blob} alt="" className={styles.blob} />
					<section className={styles.keyboard_container}>
						<span className={styles.blur}></span>
						<Keyboard bluish={true} />
					</section>
				</section>
			</main>
		</main>
	);
}
