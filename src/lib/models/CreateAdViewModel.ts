export class CreateAdViewModel {
  public adName: string;
  public redirectLink: string;
  public file?: File;
  private token: string;

  constructor() {
    this.adName = "";
    this.redirectLink = "";
    this.token = "";
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

  clearForm() {
    this.adName = "";
    this.redirectLink = "";
    this.file = undefined;
  }

  handleSubmit() {
    // upload to theta
    // if success:
    // token = blah blah blah
    // if failure:
    // keep modal open
    // display error text
    // return
    // then...
    // Upload to our db
    // if success:
    // Clear form
    // Close modal
    // Maybe pop up success message
    // if failure:
    // setToken = "";
    // keep modal open;
    // display error text;
    // return
  }
}
