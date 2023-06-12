"use client";

import { ModalContext } from "@/contexts/modal.service";
import { Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";

export default function ModalService() {
  const [openModal, setOpenModal] = useState(false);
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    setOpenModal(!!modalContext?.modalContent);
  }, [modalContext]);

  return (
    <Modal
      open={openModal}
      onClose={modalContext?.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>{modalContext?.modalContent}</>
    </Modal>
  );
}
