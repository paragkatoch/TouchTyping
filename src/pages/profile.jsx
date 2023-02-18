import Header from "@/components/Header";
import KeyboardButton from "@/components/KeyboardButton";
import styles from "@/styles/Profile.module.scss";
import { settings, testTypes } from "@/util";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Blob from "../assets/blob.png";

export default function Porfile() {
	// defualt test settings
	const [trainerSettings, setTrainerSettings] = useState({
		testType: testTypes.timeBased,
		keyboardType: "QWERTY",
		language: "English",
	});

	// store settings to localstorage and redirect to trainer page
	function handleStart() {
		if (window) {
			Object.keys(trainerSettings).forEach((item) => {
				window.localStorage.setItem(item, trainerSettings[item]);
			});

			window.location.href = "/trainer";
		}
	}

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
				{settings.map((setting, key) => (
					// Setting Item
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
												<SettingOption
													key={key}
													{...{
														option,
														setTrainerSettings,
														trainerSettings,
														id: item.id,
													}}
												/>
											))}
										</section>
									</section>
								))}
							</section>
						</section>

						{setting.title === "Trainer" && (
							<section className={styles.actions}>
								<KeyboardButton text="Start" onClick={handleStart} />
							</section>
						)}
					</section>
				))}
			</main>
		</main>
	);
}

function SettingOption({ id, option, setTrainerSettings, trainerSettings }) {
	return (
		<span
			title={option.disabled ? "disabled" : ""}
			onClick={() => {
				if (!option.disabled) {
					setTrainerSettings((prev) => ({
						...prev,
						[id]: option.name,
					}));
				}
			}}
			className={[
				styles.option,
				option.disabled ? styles.disabled : "",
				trainerSettings[id] === option.name ? styles.active : "",
			].join(" ")}
		>
			<p>{option.name}</p>
		</span>
	);
}
