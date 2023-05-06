import { useTheta } from "@/hooks/useTheta";

const { sendFileToTheta } = useTheta();

export class CreateAdViewModel {
  public adName: string;
  public redirectLink: string;
  public file?: File;
  public formNotValid: boolean;
  private token: string;

  constructor() {
    this.adName = "";
    this.redirectLink = "";
    this.token = "";
    this.formNotValid = false;
  }

  setAdName(value: string) {
    this.adName = value;
  }

  setRedirectLink(value: string) {
    if (this.redirectLink != value) {
      this.redirectLink = value;
    }
  }

  setFile(value?: File) {
    if (this.file != value) {
      this.file = value;
    }
  }

  setToken(value: string) {
    if (this.token != value) {
      this.token = value;
    }
  }

  clearForm = () => {
    this.adName = "";
    this.redirectLink = "";
    this.file = undefined;
    this.formNotValid = false;
    this.token = "";
  };

  handleSubmit = async () => {
    if (!this.adName || !this.redirectLink || !this.file) {
      this.formNotValid = true;
      console.log(this);
      return;
    }

    // upload to theta
    var response = await sendFileToTheta(this.file);

    // if failure:
    // keep modal open
    // display error text
    // return
    if (!response.ok) return; // if theta says no.

    // if success:
    // token = blah blah blah
    this.token = (await response.json()).key as string;
    console.log(this.token);

    // Upload to our db
    // if failure:

    // setToken = "";
    // keep modal open;
    // display error text;
    // return

    // if success:
    // Clear form
    // Close modal
    // Maybe pop up success message
    this.clearForm();
  };
}
