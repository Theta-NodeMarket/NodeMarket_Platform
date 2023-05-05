import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface modalProps {
  modalTitle: string;
  modalSubmitText: string;
  modalContent: React.ReactNode;
  modalOpened: boolean;
}

export default function Modal(props: modalProps) {
  return (
    <div>
      <Dialog open={props.modalOpened}>
        <DialogTitle>Create Advertisement</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/* On cancel close modal and reset form */
/* On submit modal and submit form using vm logic */

// Use context to pass this idea of a VM down to modal AND form
class SomeVM {
  // handle state in here
  //const [adName, setAdName] = useState('');
  adname = "";
  file = "";
  token = "";

  handleSubmit() {
    // do something
  }
}
