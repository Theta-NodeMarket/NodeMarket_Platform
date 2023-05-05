import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CreateAdModalContext } from "../../pages/dashboard/dashboard";

interface IModalProps {
  modalTitle: string;
  modalSubmitText: string;
  modalContent: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal(props: IModalProps) {
  return (
    <div>
      <Dialog open={props.modalOpen}>
        <DialogTitle>{props.modalTitle}</DialogTitle>
        <DialogContent>{props.modalContent}</DialogContent>
        <DialogActions>
          <Button onClick={()=>{props.setModalOpen(false)}}>Cancel</Button>
          <Button>{props.modalSubmitText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/* On cancel close modal and reset form */
/* On submit modal and submit form using vm logic */
