"use client";

import { BackdropContext } from "@/contexts/backdrop.context";
import { Backdrop, CircularProgress } from "@mui/material";
import { useContext } from "react";

export default function BackdropService() {
  const backdropContext = useContext(BackdropContext);

  const handleClose = () => {
    if (backdropContext.dismisable === false) return;

    backdropContext.setBackdropContext((prev) => ({ ...prev, state: false }));
    if (backdropContext.handleClose) backdropContext.handleClose();
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropContext.state}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
