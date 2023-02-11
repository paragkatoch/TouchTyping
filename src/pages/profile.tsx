import Header from "@/components/Header";
import KeyboardButton from "@/components/KeyboardButton";
import styles from "@/styles/Profile.module.scss";
import Image from "next/image";
import { useState } from "react";
import Blob from "../assets/blob.png";

export default function Porfile() {
	const [trainerSettings, setTrainerSettings] = useState({
		testType: "Time based",
		keyboardType: "QWERTY",
		language: "English",
	});

	function handleStart() {
		if (window) {
			Object.keys(trainerSettings).forEach((item) => {
				window.localStorage.setItem(
					item,
					trainerSettings[item as keyof typeof trainerSettings]
				);
			});

			window.location.href = "/trainer";
		}
	}

	return (
		<main className={styles.page_container}>
			<Header />

			<main className={styles.content_container}>
				{settings.map((setting, key) => (
					<section
						key={key}
						className={`${styles.container_item} background_container`}
					>
						<section className={styles.content_wrapper}>
							<h2>{setting.title}</h2>

							<section className={styles.config}>
								{setting.items.map((item, key) => (
									<section className={styles.item} key={key}>
										<p>{item.title}</p>

										<section className={styles.options}>
											{item.options.map((option, key) => (
												<span
													key={key}
													title={option.disabled ? "disabled" : ""}
													onClick={() => {
														if (!option.disabled) {
															setTrainerSettings((prev) => ({
																...prev,
																[item.id]: option.name,
															}));
														}
													}}
													className={[
														styles.option,
														option.disabled ? styles.disabled : "",
														trainerSettings[
															item.id as keyof typeof trainerSettings
														] === option.name
															? styles.active
															: "",
													].join(" ")}
												>
													<p>{option.name}</p>
												</span>
											))}
										</section>
									</section>
								))}
							</section>
						</section>

						{setting.title === "Trainer" ? (
							<section className={styles.actions}>
								<KeyboardButton
									shortcutKey="Enter"
									text="Start"
									onClick={handleStart}
								/>
							</section>
						) : (
							<></>
						)}
					</section>
				))}
			</main>

			<Image src={Blob} alt="" className={styles.blob} />
		</main>
	);
}

const settings = [
	{
		title: "Trainer",
		items: [
			{
				id: "testType",
				title: "Select the type of test you want to take",
				options: [
					{ disabled: false, name: "Time based" },
					{ disabled: false, name: "Paragraph based" },
				],
			},
		],
	},
	{
		title: "Configuration",
		items: [
			{
				id: "keyboardType",
				title: "Keyboard Type",
				options: [
					{ disabled: false, name: "QWERTY" },
					{ disabled: true, name: "DVORAK" },
					{ disabled: true, name: "COLEMAK" },
				],
			},

			{
				id: "language",
				title: "Language",
				options: [
					{ disabled: false, name: "English" },
					{ disabled: true, name: "Hindi" },
					{ disabled: true, name: "French" },
				],
			},
		],
	},
];
