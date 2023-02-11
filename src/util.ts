export type testState = "running" | "paused" | "ended";
export type testString = { character: string; index: number };
export type finalData = { testStringLength: number; errorLength: number };

export const charMap = ["a", "s", "d", "f", "j", "k", "l", ";"];
export const testTime = 300;
export const maxTextLength = 360;

export const localStorageNames = {
	testType: "testType",
};
export const testTypes = {
	timeBased: "Time based",
	paragraphBased: "Paragraph based",
};

export const testStates = {
	paused: "paused",
	ended: "ended",
	running: "running",
};

export const pages = {
	home: "/",
	profile: "/profile",
	trainer: "/trainer",
};

// helper functions

// group character by spaces in between them
// this is necessary to avoid words being split between 2 lines
// eg: [['a','s','d',' '], ['s', 'k', 'l', ' '], []]
export function groupByWord(s: testString[]) {
	return s.reduce(
		(finalArray, item) => {
			// if space then push and add new array to the finalArray
			if (item.character === " ") {
				const length = finalArray.length;

				finalArray[length - 1].push(item);
				finalArray.push([]);

				return finalArray;
			}
			// else push the character to last array of final array
			else {
				const length = finalArray.length;
				finalArray[length - 1].push(item);

				return finalArray;
			}
		},
		[[]] as Array<Array<testString>>
	);
}

export function generateChar() {
	let num = Math.floor(Math.random() * 8);

	if (num == 7) num = Math.floor(Math.random() * 8);

	return charMap[num];
}

export function generateWord(pos: number, maxLength: number) {
	const wordArray = [];
	const size = Math.min(Math.floor(Math.random() * 5) + 3, maxLength - pos);

	for (let i = 0; i < size; i++) {
		const char = generateChar();
		wordArray.push({ character: char, index: pos + i });
	}

	return wordArray;
}

export function generateTestString(maxLength: number) {
	let length = 0;
	let sentence: { character: string; index: number }[] = [];

	while (length < maxLength) {
		const word = generateWord(length, maxLength);
		sentence = [...sentence, ...word];
		length += word.length;

		if (length < maxLength - 1) {
			sentence = [...sentence, { character: " ", index: length }];
			length++;
		}
	}

	return sentence;
}

export function getKeyOnChar(s: string) {
	const code = s === ";" ? 186 : s.toUpperCase().charCodeAt(0);

	const selector = [
		'[data-key="' + code + '"]',
		'[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]',
	].join(",");

	return document.querySelector(selector as keyof HTMLElementTagNameMap);
}

export function getKey(e: KeyboardEvent) {
	let location = e.location;
	let selector;
	if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
		selector = ['[data-key="' + e.keyCode + '-R"]'];
	} else {
		var code = e.keyCode || e.which;
		selector = [
			'[data-key="' + code + '"]',
			'[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]',
		].join(",");
	}

	return document.querySelector(selector as keyof HTMLElementTagNameMap);
}

export function pressKey(char: string) {
	let key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
	if (!key) {
		return console.warn("No key for", char);
	} else {
		key.setAttribute("data-pressed", "on");

		setTimeout(function () {
			if (key) key.removeAttribute("data-pressed");
		}, 100);
	}
}

export function convertTime(time: number) {
	const leftTime = testTime - time;
	const minutes = Math.floor(leftTime / 60);
	const seconds = leftTime % 60;

	return `${minutes}:${seconds}${seconds < 10 ? "0" : ""}`;
}
