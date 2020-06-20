// TODO: Check all config files like with tsconfig's. Also others options excluding security for Angular/TypeScript compilers.
// TODO: Make everything alphabetically.
// TODO: Check TSLint options.
// TODO: Check compiler options.
// TODO: Unify all imports, remove "./".
// TODO: Check angular.json and all compiling options.
// TODO: Fix unit tests from pipeline.
// TODO: Check VSCode options.
// TODO: Remove generating source maps.
// TODO: Add Docker Bench Security.
// TODO: Make error handling to Sentry.
// TODO: Change links to policies in Agastya.
// TODO: Add in many sections Animate on Scroll (AOS) and/or WOW.js
// TODO: Check many interesting things from Angular 8 Example App.
// TODO: Add push notifications (something simple, e.g. sign up for a newsletter) and check offline worker after adding CSP.
// TODO: Check Google Analytics and Hotjar if works after implementing CSP.
// TODO: Remove 404 error related with manifest.
// TODO: Add sitemap.xml
// TODO: Add JSDoc like in services.component.ts.
// TODO: Check if HTML markups such as &copy;, &amp; etc are being used instead of (c), & etc.

import Agastya from "agastya";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser"; // TODO: Is it required here? BrowserModule is imported in CoreModule already.
// tslint:disable-next-line:nx-enforce-module-boundaries
import { CoreModule } from "./../../../../libs/core/src/index";
// tslint:disable-next-line:nx-enforce-module-boundaries
import { HomeModule } from "./../../../../libs/home/src/index";
import { NgModule } from "@angular/core";
import { RoutingModule } from "./routing/app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
// tslint:disable-next-line:nx-enforce-module-boundaries
import { SharedModule } from "./../../../../libs/shared/src/index";

new Agastya(String(process.env.AGASTYA_API_KEY)); // Make sure the environmental variable is a string.

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "ditectrevSSR" }), // Unique name across the application. However, some names (e.g. ditectrev.com) causes loosing of defined in component styles.
    CoreModule,
    HomeModule,
    RoutingModule,
    SharedModule,
    ServiceWorkerModule.register("ngsw-worker.js"),
  ],
  providers: [{ provide: "googleTagManagerId", useValue: "GTM-WVLBQKK" }], // TODO: Add other integrations.
})
export class AppModule {}
