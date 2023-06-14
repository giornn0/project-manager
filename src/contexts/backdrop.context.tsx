import { Dispatch, SetStateAction, createContext } from "react";

export interface IBackdropContext {
  state: boolean;
  dismisable?: boolean;
  handleClose?: () => void;
  setBackdropContext: Dispatch<SetStateAction<IBackdropContext>>;
}

export const BackdropContext = createContext<IBackdropContext>(
  {} as IBackdropContext
);
