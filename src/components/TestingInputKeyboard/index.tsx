import { TrainerAction } from "@/redux/slices/trainerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	generateTestString,
	getKey,
	getKeyOnChar,
	groupByWord,
	maxTextLength,
	pressKey,
	testStates,
	testString,
} from "@/util";
import { useEffect, useState } from "react";
import Keyboard from "../Keyboard";
import styles from "./styles.module.scss";

/**
 * Component to handle input box, keyboard and keypress in a test
 */
export default function TestingInputKeyboard() {
	const dispatch = useAppDispatch();
	const { timedTest, testState } = useAppSelector(
		(state) => state.trainerSlice
	);

	// test string for the user
	const [testString, setTestString] = useState<testString[]>([]);
	// cursor position
	const [currentIndex, setCurrentIndex] = useState(0);
	// array of wrong typed characters index
	const [errorIndex, setErrorIndex] = useState<number[]>([]);

	// generate initial test string and end test if necessary
	useEffect(() => {
		// if test is paragraph based and user has typed whole paragraph
		if (!timedTest && currentIndex >= maxTextLength) {
			// set finalData and end the test
			dispatch(
				TrainerAction.incrementFinalData({
					errorLength: errorIndex.length,
					testStringLength: testString.length,
				})
			);

			dispatch(TrainerAction.endTest());
		}
		// if test is time based and test string is not generated yet or user has typed the intial string
		else if (testString.length === 0 || currentIndex >= maxTextLength) {
			// set form data, regenerate/reset values of test string, currentIndex and errorIndex
			dispatch(
				TrainerAction.incrementFinalData({
					errorLength: errorIndex.length,
					// since its a timed test, increment would be total characters typed in current iteration
					testStringLength: Math.min(currentIndex, maxTextLength),
				})
			);

			const newTestString = generateTestString(maxTextLength);

			setTestString(newTestString);
			setCurrentIndex(0);
			setErrorIndex([]);
		}
	}, [currentIndex, dispatch, errorIndex.length, testString.length, timedTest]);

	// highlight the next key to be pressed
	useEffect(() => {
		// if the test is running and cursor is not at the end
		if (
			testState === testStates.running &&
			currentIndex < maxTextLength &&
			testString[currentIndex]
		) {
			// get nextKey
			const key = getKeyOnChar(testString[currentIndex].character);

			if (!key) {
				return console.warn("No key for", testString[currentIndex].character);
			}

			// hightlight the key to be pressed blue
			key.setAttribute("data-press-next", "true");
		}
	}, [currentIndex, testState, testString]);

	// handle key press i.e., key-down and key-up
	useEffect(() => {
		// hightlight correct and incorrect pressed keys and increment currentIndex
		function handleKeyDown(event: KeyboardEvent) {
			// return if overflow
			if (currentIndex >= maxTextLength || !testString[currentIndex]) return;

			// get pressed key
			const key = getKey(event);

			if (!key) {
				return console.warn("No key for", event.keyCode);
			}

			// play press animation on the key
			pressKey(event.key);

			// if wrong key is pressed then highlight it red
			if (event.key !== testString[currentIndex].character) {
				key.setAttribute("data-press-correct", "false");
				setErrorIndex((prev) => [...prev, currentIndex]);
			}
			// if right key is pressed then highlight it green
			else {
				key.setAttribute("data-press-correct", "true");
			}

			// get key which was supposed to be pressed i.e., testString[currentIndex].character
			const currentKey = getKeyOnChar(testString[currentIndex].character);

			// remove the blue highlight from the key and move to the next key
			currentKey && currentKey.removeAttribute("data-press-next");
			setCurrentIndex((prev) => prev + 1);

			// set pressed key to pressed
			key.setAttribute("data-pressed", "on");
		}

		// remove attributes from pressed keys
		function handleKeyUp(event: KeyboardEvent) {
			// get pressed key
			let key = getKey(event);
			// cleanup
			key && key.removeAttribute("data-press-correct");
			key && key.removeAttribute("data-pressed");
		}

		if (testState === "running") {
			// add event-listeners to keyup and keydown
			window.addEventListener("keydown", handleKeyDown);
			window.addEventListener("keyup", handleKeyUp);
		}

		// cleanup function
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [testString, currentIndex, testState]);

	return (
		<>
			<main className={styles.text_section}>
				{/* Text Section */}
				<section className={styles.text_container}>
					{groupByWord(testString).map((item, key) => {
						return (
							<div key={item[0]?.index ?? key}>
								{item.map((item) => {
									const { index, character } = item;

									if (currentIndex > index) {
										return (
											<div
												key={index}
												className={[
													styles.typed,
													errorIndex.includes(index) ? styles.wrong : "",
												].join(" ")}
											>
												<p>{character}</p>
											</div>
										);
									}

									return (
										<div
											key={index}
											className={currentIndex === index ? styles.active : ""}
										>
											<p>{character}</p>
										</div>
									);
								})}
							</div>
						);
					})}
				</section>
			</main>

			{/* Keyboard Section */}
			<section className={styles.keyboard_container}>
				<Keyboard bluish={false} />
			</section>
		</>
	);
}
