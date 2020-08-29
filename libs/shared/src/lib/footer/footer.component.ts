import { Component } from "@angular/core";
import {
  faAt,
  faHome,
  faInfoCircle,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";
import { library } from "@fortawesome/fontawesome-svg-core";

// TODO: Make this a separated file.
interface ResponseMailChimp {
  result: string;
  msg: string;
}

// TODO: Add invisible reCAPTCHA?
// TODO: Social icons with education included, when blog/courses will be done then: CodeSandbox, Discord, GitHub, Medium and YouTube too.
// TODO: Zoom in a bit this section/region of footer (one of the three only: "Ditectrev", "Stay Informed", "Information") which is on hover.
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  public constructor(private httpClient: HttpClient) {
    library.add(faAt);
    library.add(faFacebookF);
    library.add(faHome);
    library.add(faInstagram);
    library.add(faInfoCircle);
    library.add(faLinkedinIn);
    library.add(faPhone);
    library.add(faTwitter);
  }

  public formControlEmail: FormControl = new FormControl(null, [
    Validators.email,
    Validators.maxLength(512),
    Validators.minLength(6),
    Validators.required,
  ]);

  public currentDate: Date = new Date();
  public endpointMailChimp = String(process.env.MAILCHIMP_ENDPOINT); // Make sure the environmental variable is a string. // TODO: It's problematic when goes from GitLab CI.
  public error = "";
  public submitted = false;

  public bottomMenuItems: { name: string; path: string }[] = [
    { name: "Copyrights", path: "/copyrights" },
    { name: "Privacy & Security", path: "/privacy-and-security" },
    { name: "Sitemap", path: "/sitemap" },
    { name: "Terms of Use", path: "/terms-of-use" },
  ];

  public informationItems: {
    content: string;
    icon: [string, string];
    name: string;
  }[] = [
    {
      content: "Irysowa 18, 55-220 Jelcz-Laskowice, Poland",
      icon: ["fas", "home"],
      name: "Address",
    },
    {
      content: "+48 732 280 741", // TODO: Make phone number unsafe HTML and interactive.
      icon: ["fas", "phone"],
      name: "Phone number",
    },
    { content: "contact@ditectrev.com", icon: ["fas", "at"], name: "Email" }, // TODO: Make e-mail unsafe HTML and interactive.
    {
      content: "Tax ID: PL9121899240",
      icon: ["fas", "info-circle"],
      name: "Legal information",
    },
  ];
  public rightMenuItems: { name: string; path: string }[] = [
    { name: "Faq", path: "/faq" },
    { name: "Glossary", path: "/glossary" },
    { name: "Partnerships", path: "/partnerships" },
  ];

  public socialItems: {
    icon: [string, string];
    name: string;
    url: string;
  }[] = [
    {
      icon: ["fab", "facebook-f"],
      name: "Facebook",
      url: "https://www.facebook.com/ditectrev",
    },
    {
      icon: ["fab", "instagram"],
      name: "Instagram",
      url: "https://www.instagram.com/ditectrev",
    },
    {
      icon: ["fab", "linkedin-in"],
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/ditectrev",
    },
    {
      icon: ["fab", "twitter"],
      name: "Twitter",
      url: "https://twitter.com/ditectrev",
    },
  ];

  public onSubmit(): void {
    const params = new HttpParams()
      .set("EMAIL", this.formControlEmail.value)
      .set(String(process.env.MAILCHIMP_HIDDEN_INPUT), ""); // Hidden input. Make sure the environmental variable is a string. // TODO: It's problematic when goes from GitLab CI.
    const urlMailChimp = this.endpointMailChimp + params.toString();

    this.httpClient.jsonp<ResponseMailChimp>(urlMailChimp, "c").subscribe(
      (response) => {
        if (response.result && response.result !== "error") {
          this.submitted = true;
          alert("Thank you for subscribing into our list."); // TODO: Make this a SweetAlert (as any other user interaction).
        } else {
          alert("An error occured, our apologizes."); // TODO: Make this a SweetAlert (as any other user interaction).
        }
      },
      (error) => {
        console.error(error); // TODO: Remove this or make this as Sentry (as well as add contact error handling to Sentry).
        alert("An error occured, our apologizes."); // TODO: Make this a SweetAlert (as any other user interaction).
      }
    );
    this.formControlEmail.reset(); // Reset the mail input.
  }
}
