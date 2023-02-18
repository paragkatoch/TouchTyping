import { useAppSelector } from "@/redux/store";
import { pages } from "@/util";
import KeyboardButton from "../KeyboardButton";
import styles from "./styles.module.scss";

export default function Result() {
	const { timer, finalData } = useAppSelector((state) => state.trainerSlice);

	return (
		<>
			<section className={styles.result}>
				<section className={styles.header}>
					<p>Result</p>

					<KeyboardButton
						onClick={() => {
							if (window) window.location.href = pages.profile;
						}}
						shortcutKey=""
						text="Close"
					/>
				</section>

				<section className={styles.resultItems}>
					<ResultListItem
						title="Accuracy"
						value={`${Math.floor(
							((finalData.testStringLength - finalData.errorLength) * 100) /
								finalData.testStringLength
						)}%`}
					/>
					<ResultListItem
						title="Speed (wpm)"
						value={`${Math.floor(
							(finalData.testStringLength * 60) / 5 / timer
						)}`}
					/>
				</section>

				<section className={styles.summary}>
					<section className={styles.summaryItem}>
						<p className={styles.title}>Characters</p>

						<p className={styles.value}>{finalData.testStringLength}</p>
					</section>

					<section className={styles.summaryItem}>
						<p className={styles.title}>Mistakes</p>

						<p className={styles.value}>{finalData.errorLength}</p>
					</section>

					<section className={styles.summaryItem}>
						<p className={styles.title}>Time(s)</p>

						<p className={styles.value}>{timer}</p>
					</section>
				</section>
			</section>
		</>
	);
}

function ResultListItem({ title, value }) {
	return (
		<section className={styles.resultListItem}>
			<p className={styles.title}>{title} -</p>

			<section className={styles.data}>
				<section className={styles.graph}>
					<span>{value}</span>
				</section>

				<section className={styles.text}>
					<p className={styles.data_title}>Good</p>

					<p className={styles.data_desc}>
						Youʼre on the right track to becoming an efficient and fast typer.
						Keep practicing and youʼll soon reach your typing goal. Keep up the
						good work!
					</p>
				</section>
			</section>
		</section>
	);
}
