import { AfterViewChecked, Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
// TODO: Make SiriWave working, issue #31.
// TODO: Make RevealFx working ,issue #3.

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements AfterViewChecked, OnInit {
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
    this.spinner.show(); // TODO: Show it only during the first load, dynamically.
  }

  /**
   * @access public
   * @callback ngAfterViewChecked
   * @description Invoked immediately after Angular has completed checking component's view.
   * @returns {void}
   */
  public ngAfterViewChecked(): void {
    this.spinner.hide();
  }
}
