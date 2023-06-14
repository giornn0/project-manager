import { Nullable } from "@/constants/types";
import { Dispatch, ReactElement, SetStateAction, createContext } from "react";

export interface IModalContext {
  modalContent: Nullable<ReactElement> | string;
  handleClose?: () => void;
  setModalContext: Dispatch<SetStateAction<IModalContext>>;
}

export const ModalContext = createContext<IModalContext>({} as IModalContext);
