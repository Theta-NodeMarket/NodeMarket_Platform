import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { glassCardBgSettings } from "@/utils/consts";

interface IModalProps {
  modalTitle: string;
  modalSubmitText: string;
  modalContent: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  onCancel?: () => void;
}

export default function GenericDialog(props: IModalProps) {
  return (
    <div>
      <Dialog open={props.modalOpen}>
        <DialogTitle style={{ background: glassCardBgSettings }}>
          {props.modalTitle}
        </DialogTitle>
        <DialogContent style={{ background: glassCardBgSettings }}>
          {props.modalContent}
        </DialogContent>
        <DialogActions style={{ background: glassCardBgSettings }}>
          <Button
            onClick={() => {
              props.onCancel?.();
              props.setModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={props.onSubmit}>{props.modalSubmitText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
