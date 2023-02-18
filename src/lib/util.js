/**
 * static data
 */

// allowed characters
export const charMap = ["a", "s", "d", "f", "j", "k", "l", ";"];
// time in seconds for timed test
export const testTime = 300;
// max string length in 1 paragraph
export const maxParagraphLength = 360;

// local storage keys
export const localStorageVarNames = {
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
