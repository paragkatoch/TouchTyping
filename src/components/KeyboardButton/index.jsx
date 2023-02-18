import styles from "./styles.module.scss";

export default function KeyboardButton({
	shortcutKey = "",
	text = "",
	onClick = () => {},
}) {
	return (
		<button className={styles.keyboardButton} onClick={onClick}>
			{shortcutKey ? (
				<span className={styles.key}>
					<p>{shortcutKey}</p>
				</span>
			) : (
				<></>
			)}
			{text}
		</button>
	);
}
