/**
 * fixed data
 */

// allowed characters
export const charMap = ["a", "s", "d", "f", "j", "k", "l", ";"];
// time in seconds for timed test
export const testTime = 300;
// max string length in 1 paragraph
export const maxTextLength = 360;

// local storage keys
export const localStorageNames = {
	testType: "testType",
};

// types of tests
export const testTypes = {
	timeBased: "Time based",
	paragraphBased: "Paragraph based",
};

// type of test sttes
export const testStates = {
	paused: "paused",
	ended: "ended",
	running: "running",
};

// pages in the application
export const pages = {
	home: "/",
	profile: "/profile",
	trainer: "/trainer",
};

// test settings and options
export const settings = [
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

/**
 * helper functions
 */

// group character by spaces in between them
// this is necessary to avoid words being split between 2 lines
// eg: [['a','s','d',' '], ['s', 'k', 'l', ' '], []]
export function groupByWord(testString) {
	return testString.reduce(
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
		[[]]
	);
}

// return a random character from the charMap
export function generateChar() {
	let num = Math.floor(Math.random() * 8);

	if (num == 7) num = Math.floor(Math.random() * 8);

	return charMap[num];
}

// return a random word of length 3-7
export function generateWord(pos, maxLength) {
	const wordArray = [];
	// size of the word
	const size = Math.min(Math.floor(Math.random() * 5) + 3, maxLength - pos);

	for (let i = 0; i < size; i++) {
		const char = generateChar();
		wordArray.push({ character: char, index: pos + i });
	}

	return wordArray;
}

// return a random paragraph of specifed length
export function generateTestString(maxLength) {
	let length = 0;
	let sentence = [];

	while (length < maxLength) {
		// generate word
		const word = generateWord(length, maxLength);
		sentence = [...sentence, ...word];
		length += word.length;

		// add space after word
		if (length < maxLength - 1) {
			sentence = [...sentence, { character: " ", index: length }];
			length++;
		}
	}

	return sentence;
}

// return the element associated with the character
export function getKeyOnChar(char) {
	// get the key code
	const code = char === ";" ? 186 : char.toUpperCase().charCodeAt(0);

	// return the element
	const selector = [
		'[data-key="' + code + '"]',
		'[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]',
	].join(",");

	return document.querySelector(selector);
}

// return the element associated with the key pressed
export function getKey(keyEvent) {
	let location = keyEvent.location;
	let selector;

	// check if the key was on the right side
	if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
		selector = ['[data-key="' + keyEvent.keyCode + '-R"]'];
	} else {
		// get key code
		var code = keyEvent.keyCode || keyEvent.which;
		selector = [
			'[data-key="' + code + '"]',
			'[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]',
		].join(",");
	}

	// select and return the element
	return document.querySelector(selector);
}

// play the press key animation for a character
export function pressKey(char) {
	// get the element associated with the key
	let key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');

	if (!key) {
		return console.warn("No key for", char);
	} else {
		// add the pressed class
		key.setAttribute("data-pressed", "on");

		setTimeout(function () {
			if (key) key.removeAttribute("data-pressed");
		}, 100);
	}
}

// covert remaing time to `MM:SS` format
export function convertTime(time) {
	const leftTime = testTime - time;
	const minutes = Math.floor(leftTime / 60);
	const seconds = leftTime % 60;

	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
