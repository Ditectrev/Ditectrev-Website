import * as AOS from "aos";
import { Component, OnInit } from "@angular/core";

/**
 * @component CopyrightsComponent
 * @description Create the component.
 * @implements OnInit
 */
@Component({
  selector: "app-copyrights",
  templateUrl: "./copyrights.component.html",
  styleUrls: ["./copyrights.component.scss"],
})
export class CopyrightsComponent implements OnInit {
  /**
   * @access public
   * @callback ngOnInit
   * @description Invoked immediately after Angular has completed initialization and setting up component.
   * @returns {void}
   */
  ngOnInit() {
    AOS.init(); // Initialie Animate on Scroll (AOS) library.
  }
}
