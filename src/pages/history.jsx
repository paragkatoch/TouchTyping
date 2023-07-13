import Header from "@/components/Header";
import KeyboardButton from "@/components/KeyboardButton";
import styles from "@/styles/history.module.scss";
import { settings, testTypes } from "@/lib/util";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Blob from "../assets/blob.png";

export default function History() {
	const [typingHistory, setTypingHistory] = useState(null);

	// get history
	useEffect(() => {
		const resultArray = JSON.parse(localStorage.getItem("results"));
		setTypingHistory(resultArray);
	}, []);

	return (
		<main className={styles.page_container}>
			<Head>
				<title>Profile: Touch Typing</title>
			</Head>

			{/* Header */}
			<Header />

			<Image src={Blob} alt="" className={styles.blob} />

			{/* Options */}
			<main className={styles.content_container}>
				<h2>Result History</h2>

				{!typingHistory && (
					<section className={`${styles.container_item} background_container2`}>
						<section className={styles.content_wrapper}>
							<p>empty</p>
						</section>
					</section>
				)}

				{typingHistory && (
					<section className={`${styles.container_item} background_container2`}>
						<section className={styles.content_wrapper}>
							<p>Index</p>
							<p>Characters</p>
							<p>Mistakes</p>
							<p>Speed (wpm)</p>
							<p>Accuracy</p>
							<p>Time(s)</p>
						</section>
					</section>
				)}

				{typingHistory &&
					typingHistory.map((history, key) => (
						<section
							key={key}
							className={`${styles.container_item} background_container2`}
						>
							<section className={styles.content_wrapper}>
								<p>#{key + 1}</p>
								<p>{history.character}</p>
								<p>{history.mistake}</p>
								<p>{history.speed}</p>
								<p>{history.accuracy}</p>
								<p>{history.time}</p>
							</section>
						</section>
					))}
			</main>
		</main>
	);
}
