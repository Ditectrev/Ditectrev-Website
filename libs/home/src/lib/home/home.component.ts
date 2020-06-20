import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
// TODO: Make SiriWave working, issue #31.
// TODO: Make RevealFx working ,issue #3.

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  /**
   * @constructor
   * @description Create a new instance of this component.
   * @param {NgxSpinnerService} spinner Spinner class object to show/hide spinner on home page.
   */
  constructor(private spinner: NgxSpinnerService) {}

  /**
   * @access public
   * @callback ngOnInit
   * @description Invoked immediately after Angular has completed initialization and setting up component.
   * @returns {void}
   */
  public ngOnInit(): void {
    // Show spinner for 3 seconds.
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
