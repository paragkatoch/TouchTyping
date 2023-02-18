import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import trainerSlice from "./slices/trainerSlice";

export const store = configureStore({
	reducer: {
		trainerSlice: trainerSlice,
	},
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
