import KeyboardButton from "@/components/KeyboardButton";
import Link from "next/link";
import styles from "@/styles/trainer.module.scss";
import { useEffect } from "react";

import TestingInputKeyboard from "@/components/TestingInputKeyboard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { TrainerAction } from "@/redux/slices/trainerSlice";
import {
	convertTime,
	localStorageNames,
	pages,
	testStates,
	testTime,
	testTypes,
} from "@/util";
import Result from "@/components/Result";
import Image from "next/image";
import Blob from "../assets/blob.png";

export default function Trainer() {
	const dispatch = useAppDispatch();
	const { timedTest, timer, testState } = useAppSelector(
		(state) => state.trainerSlice
	);

	useEffect(() => {
		const testType = window.localStorage.getItem(localStorageNames.testType);

		if (
			testType !== testTypes.timeBased &&
			testType !== testTypes.paragraphBased
		) {
			window.location.href = pages.profile;
		} else {
			dispatch(TrainerAction.setTimedTest(testType === testTypes.timeBased));
		}
	}, [dispatch]);

	useEffect(() => {
		let interval: null | NodeJS.Timer = null;

		if (testState === testStates.running) {
			interval = setInterval(() => {
				dispatch(TrainerAction.incrementTimer());
			}, 1000);
		} else {
			interval && clearInterval(interval);
		}

		return () => {
			interval && clearInterval(interval);
		};
	}, [dispatch, testState]);

	useEffect(() => {
		if (timedTest && timer >= testTime) {
			dispatch(TrainerAction.endTest());
		}
	}, [dispatch, timedTest, timer]);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (testState === testStates.running && event.code === "Escape") {
				dispatch(TrainerAction.pauseTest());
			} else if (testState === testStates.paused && event.code === "Space") {
				dispatch(TrainerAction.startTest());
			}
		}

		if (testState !== testStates.ended) {
			window.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [dispatch, testState]);

	return (
		<main className={styles.page_container}>
			{/* Header */}
			<header>
				<Link href="/" className="logo">
					Touch-Typing
				</Link>

				{timedTest ? (
					<section className={styles.timer}>
						<p>{convertTime(timer)}</p>
					</section>
				) : (
					<></>
				)}

				<section className={styles.controller}>
					<KeyboardButton
						onClick={() => {
							if (testState === testStates.ended) {
								return;
							} else if (testState === testStates.paused) {
								dispatch(TrainerAction.startTest());
							} else {
								dispatch(TrainerAction.pauseTest());
							}
						}}
						shortcutKey={testState === testStates.paused ? "Space" : "Esc"}
						text={testState === testStates.paused ? "Start" : "Pause"}
					/>
				</section>
			</header>

			{/* Test Section */}
			<TestingInputKeyboard />

			{/* Result Section */}
			{testState === testStates.ended ? <Result /> : <></>}

			<Image src={Blob} alt="" className={styles.blob} />
		</main>
	);
}
