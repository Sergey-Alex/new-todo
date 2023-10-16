import { useDispatch } from "react-redux";
import { AppDispatch } from "common/app/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
