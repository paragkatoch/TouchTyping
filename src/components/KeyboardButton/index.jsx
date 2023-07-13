import styles from "./styles.module.scss";

export default function KeyboardButton({
	shortcutKey = "",
	text = "",
	onClick = () => {},
	hidden = false,
}) {
	return (
		<button
			className={styles.keyboardButton}
			onClick={onClick}
			style={{ opacity: hidden ? "0" : "1" }}
		>
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
