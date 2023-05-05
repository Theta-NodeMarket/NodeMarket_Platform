export class CreateAdViewModel {
    public adName: string;
    public redirectLink: string;
    public file: HTMLInputElement | null;
    private token: string;

    constructor() {
        this.adName = "";
        this.redirectLink = "";
        this.file = null;
        this.token = "";
    }

    setAdName(value: string) {
        this.adName = value;
    }

    setRedirectLink(value: string) {
        if(this.redirectLink != value)
        {
            this.redirectLink = value;
        }
    }

    setFile(value: HTMLInputElement) {
        if(this.file != value)
        {
            this.file = value;
        }
    }

    setToken(value: string) {
        if(this.token != value)
        {
            this.token = value;
        }
    }
}