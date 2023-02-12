import { finalData, testState } from "@/util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrainerState = {
	timedTest: boolean | null;
	timer: number;
	testState: testState;
	finalData: finalData;
};

const initialState: TrainerState = {
	// Is the test timed or not
	timedTest: null,

	// time in seconds for the test
	timer: 0,

	// current test state
	testState: "paused",

	// result of the test
	finalData: {
		// number of characters typed
		testStringLength: 0,

		// number of characters typed incorrectly
		errorLength: 0,
	},
};

const trainerSlice = createSlice({
	name: "trainer",
	initialState,
	reducers: {
		// set the timedTest state
		setTimedTest(state, action: PayloadAction<boolean>) {
			state.timedTest = action.payload;
		},

		// increment the timer
		incrementTimer(state) {
			state.timer += 1;
		},

		// reset the timer
		resetTimer(state) {
			state.timer = 0;
		},

		// start the test
		startTest(state) {
			state.testState = "running";
		},

		// pause the test
		pauseTest(state) {
			state.testState = "paused";
		},

		// end the test
		endTest(state) {
			state.testState = "ended";
		},

		// added current data to finalData
		incrementFinalData(state, action: PayloadAction<finalData>) {
			state.finalData = {
				testStringLength:
					state.finalData.testStringLength + action.payload.testStringLength,
				errorLength: state.finalData.errorLength + action.payload.errorLength,
			};
		},
	},
});

export const TrainerAction = trainerSlice.actions;

export default trainerSlice.reducer;
