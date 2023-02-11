import { finalData, testState } from "@/util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrainerState = {
	timedTest: boolean | null;
	timer: number;
	testState: testState;
	finalData: finalData;
};

const initialState: TrainerState = {
	timedTest: null,
	timer: 0,
	testState: "paused",
	finalData: {
		testStringLength: 0,
		errorLength: 0,
	},
};

const trainerSlice = createSlice({
	name: "trainer",
	initialState,
	reducers: {
		setTimedTest(state, action: PayloadAction<boolean>) {
			state.timedTest = action.payload;
		},

		incrementTimer(state) {
			state.timer += 1;
		},
		resetTimer(state) {
			state.timer = 0;
		},

		startTest(state) {
			state.testState = "running";
		},
		pauseTest(state) {
			state.testState = "paused";
		},
		endTest(state) {
			state.testState = "ended";
		},

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

// export const selectStore = (state: RootState) => state.editor;

export default trainerSlice.reducer;
