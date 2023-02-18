import styles from "./style.module.scss";

export default function Keyboard({ bluish = false }) {
	return (
		<div className={[styles.keyboard, bluish ? styles.blueish : ""].join(" ")}>
			<div className={styles.keyboard__row}>
				<div className={styles.key__double} data-key="192">
					<div>~</div>
					<div>`</div>
				</div>
				<div className={styles.key__double} data-key="49">
					<div>!</div>
					<div>1</div>
				</div>
				<div className={styles.key__double} data-key="50">
					<div>@</div>
					<div>2</div>
				</div>
				<div className={styles.key__double} data-key="51">
					<div>#</div>
					<div>3</div>
				</div>
				<div className={styles.key__double} data-key="52">
					<div>$</div>
					<div>4</div>
				</div>
				<div className={styles.key__double} data-key="53">
					<div>%</div>
					<div>5</div>
				</div>
				<div className={styles.key__double} data-key="54">
					<div>^</div>
					<div>6</div>
				</div>
				<div className={styles.key__double} data-key="55">
					<div>&</div>
					<div>7</div>
				</div>
				<div className={styles.key__double} data-key="56">
					<div>*</div>
					<div>8</div>
				</div>
				<div className={styles.key__double} data-key="57">
					<div>(</div>
					<div>9</div>
				</div>
				<div className={styles.key__double} data-key="48">
					<div>)</div>
					<div>0</div>
				</div>
				<div className={styles.key__double} data-key="189">
					<div>_</div>
					<div>-</div>
				</div>
				<div className={styles.key__double} data-key="187">
					<div>+</div>
					<div>=</div>
				</div>
				<div
					className={[
						styles.key__bottom_right,
						styles.key__word,
						styles.key__w4,
					].join(" ")}
					data-key="8"
				>
					<span>delete</span>
				</div>
			</div>

			<div className={styles.keyboard__row}>
				<div
					className={[
						styles.key__bottom_left,
						styles.key__word,
						styles.key__w4,
					].join(" ")}
					data-key="9"
				>
					<span>tab</span>
				</div>
				<div className={styles.key__letter} data-char="Q">
					Q
				</div>
				<div className={styles.key__letter} data-char="W">
					W
				</div>
				<div className={styles.key__letter} data-char="E">
					E
				</div>
				<div className={styles.key__letter} data-char="R">
					R
				</div>
				<div className={styles.key__letter} data-char="T">
					T
				</div>
				<div className={styles.key__letter} data-char="Y">
					Y
				</div>
				<div className={styles.key__letter} data-char="U">
					U
				</div>
				<div className={styles.key__letter} data-char="I">
					I
				</div>
				<div className={styles.key__letter} data-char="O">
					O
				</div>
				<div className={styles.key__letter} data-char="P">
					P
				</div>
				<div className={styles.key__double} data-key="219" data-char="{[">
					<div>{`{`}</div>
					<div>[</div>
				</div>
				<div className={styles.key__double} data-key="221" data-char="}]">
					<div>{`}`}</div>
					<div>]</div>
				</div>
				<div className={styles.key__double} data-key="220" data-char="|\">
					<div>|</div>
					<div>\</div>
				</div>
			</div>

			<div className={styles.keyboard__row}>
				<div
					className={[
						styles.key__bottom_left,
						styles.key__word,
						styles.key__w5,
					].join(" ")}
					data-key="20"
				>
					<span>caps lock</span>
				</div>
				<div className={styles.key__letter} data-char="A">
					A
				</div>
				<div className={styles.key__letter} data-char="S">
					S
				</div>
				<div className={styles.key__letter} data-char="D">
					D
				</div>
				<div className={styles.key__letter} data-char="F">
					F
				</div>
				<div className={styles.key__letter} data-char="G">
					G
				</div>
				<div className={styles.key__letter} data-char="H">
					H
				</div>
				<div className={styles.key__letter} data-char="J">
					J
				</div>
				<div className={styles.key__letter} data-char="K">
					K
				</div>
				<div className={styles.key__letter} data-char="L">
					L
				</div>
				<div className={styles.key__double} data-key="186">
					<div>:</div>
					<div>;</div>
				</div>
				<div className={styles.key__double} data-key="222">
					<div>{`"`}</div>
					<div>{`'`}</div>
				</div>
				<div
					className={[
						styles.key__bottom_right,
						styles.key__word,
						styles.key__w5,
					].join(" ")}
					data-key="13"
				>
					<span>return</span>
				</div>
			</div>

			<div className={styles.keyboard__row}>
				<div
					className={[
						styles.key__bottom_left,
						styles.key__word,
						styles.key__w6,
					].join(" ")}
					data-key="16"
				>
					<span>shift</span>
				</div>
				<div className={styles.key__letter} data-char="Z">
					Z
				</div>
				<div className={styles.key__letter} data-char="X">
					X
				</div>
				<div className={styles.key__letter} data-char="C">
					C
				</div>
				<div className={styles.key__letter} data-char="V">
					V
				</div>
				<div className={styles.key__letter} data-char="B">
					B
				</div>
				<div className={styles.key__letter} data-char="N">
					N
				</div>
				<div className={styles.key__letter} data-char="M">
					M
				</div>
				<div className={styles.key__double} data-key="188">
					<div>&lt;</div>
					<div>,</div>
				</div>
				<div className={styles.key__double} data-key="190">
					<div>&gt;</div>
					<div>.</div>
				</div>
				<div className={styles.key__double} data-key="191">
					<div>?</div>
					<div>/</div>
				</div>
				<div
					className={[
						styles.key__bottom_right,
						styles.key__word,
						styles.key__w6,
					].join(" ")}
					data-key="16-R"
				>
					<span>shift</span>
				</div>
			</div>

			<div
				className={[styles.keyboard__row, styles.keyboard__row__h3].join(" ")}
			>
				<div className={[styles.key__bottom_left, styles.key__word].join(" ")}>
					<span>fn</span>
				</div>
				<div
					className={[
						styles.key__bottom_left,
						styles.key__word,
						styles.key__w1,
					].join(" ")}
					data-key="17"
				>
					<span>control</span>
				</div>
				<div
					className={[
						styles.key__bottom_left,
						styles.key__word,
						styles.key__w1,
					].join(" ")}
					data-key="18"
				>
					<span>option</span>
				</div>
				<div
					className={[
						styles.key__bottom_right,
						styles.key__word,
						styles.key__w3,
					].join(" ")}
					data-key="91"
				>
					<span>command</span>
				</div>
				<div
					className={[
						styles.key__double,
						styles.key__right,
						styles.key__space,
					].join(" ")}
					data-key="32"
					data-char=" "
				>
					&nbsp;
				</div>
				<div
					className={[
						styles.key__bottom_left,
						styles.key__word,
						styles.key__w3,
					].join(" ")}
					data-key="93_R"
				>
					<span>command</span>
				</div>
				<div
					className={[
						styles.key__bottom_left,
						styles.key__word,
						styles.key__w1,
					].join(" ")}
					data-key="18_R"
				>
					<span>option</span>
				</div>
				<div data-key="37" className={styles.key__arrow}>
					<span>&#9664;</span>
				</div>
				<div
					className={[styles.key__double, styles.key__arrow__tall].join(" ")}
					data-key="38"
				>
					<div>&#9650;</div>
					<div>&#9660;</div>
				</div>
				<div data-key="39" className={styles.key__arrow}>
					<span>&#9654;</span>
				</div>
			</div>
		</div>
	);
}
