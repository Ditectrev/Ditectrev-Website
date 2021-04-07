import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { rollIn } from 'ng-animate';
import { ParticlesConfig } from './particles/particles-config';
import { TextAnimation } from 'ngx-teximate';

declare let particlesJS: any; // Required to be properly interpreted by TypeScript.

// TODO: Change the SliderComponent name?
/**
 * @component SliderComponent
 * @description Create the component.
 * @implements OnInit
 */
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  private headerText: string =
    "<span style='color: #3f51b5'>#Build</span> <span style='font-weight: 100'>Your</span> Digital Future.<br><a href='/contact'>Contact Us</a>"; // Styles and text for the heading.
  public headerSafeHtml: SafeHtml; // Required for mixing styles in HTML tags within a string.

  // ng-animate & ngx-teximate settings.
  public enterAnimation: TextAnimation = {
    animation: rollIn,
    delay: 100,
    type: 'letter',
  };
  public subheaderText: string =
    'Online Education and Information Technology (IT) Consulting.';

  /**
   * @constructor
   * @description Create a new instance of this component.
   * @param {DomSanitizer} domSanitizer Angular's built-in service to prevent attackers from injecting malicious client-side scripts.
   */
  constructor(private domSanitizer: DomSanitizer) {
    // Bypass Angular's XSS protection to parse HTML mixed with styles.
    this.headerSafeHtml = this.domSanitizer.bypassSecurityTrustHtml(
      this.headerText
    );
  }

  /**
   * @access public
   * @callback ngOnInit
   * @description Invoked immediately after Angular has completed initialization and setting up component.
   * @returns {void}
   */
  public ngOnInit(): void {
    this.invokeParticles();
  }

  /**
   * @access public
   * @description Invoke Particles.
   * @function invokeParticles
   * @returns {void}
   */
  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () {});
  }
}
