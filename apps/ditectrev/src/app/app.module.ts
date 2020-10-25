// TODO: Check all config files like with tsconfig's. Also others options excluding security for Angular/TypeScript compilers.
// TODO: Check TSLint options.
// TODO: Check compiler options.
// TODO: Check angular.json and all compiling options.
// TODO: Fix unit tests from pipeline, after upgrade running "ng test" runs only 1 project and has problem (https://stackoverflow.com/questions/42260218/jest-setup-syntaxerror-unexpected-token-export and https://github.com/nrwl/nx/issues/2815, https://github.com/nrwl/nx/issues/3191#issuecomment-648688856 partially not running tests at all) to run at all btw, so fix it too.
// TODO: Check VSCode options.
// TODO: Add Docker Bench Security.
// TODO: Make error handling to Sentry, just be sure source maps aren't deployed to the hosting, only to Sentry (https://medium.com/angular-in-depth/debug-angular-apps-in-production-without-revealing-source-maps-ab4a235edd85).
// TODO: Change links to policies in Agastya.
// TODO: Check many interesting things from Angular 8 Example App.
// TODO: Add push notifications (something simple, e.g. sign up for a newsletter) and check offline worker after adding CSP.
// TODO: Check Google Analytics and Hotjar if works after implementing CSP.
// TODO: Remove 404 error related with manifest.
// TODO: Add JSDoc like in services.component.ts.
// TODO: Check if HTML markups such as &copy;, &amp; etc are being used instead of (c), & etc.
// TODO: Change all fonts units to rem.
// TODO: Make CSS and HTML alphabetically (only these are missing).
// TODO: Convert all PNG files to SVG, alternatively some to AVIF.
// TODO: Use native lazy loading on images (loading="lazy").
// TODO: Automate renaming "main.js" from "functions/dist/apps/ditectrev-server" to "index.js" in the root.

// import Agastya from 'agastya';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser'; // TODO: Is it required here? BrowserModule is imported in CoreModule already.
// tslint:disable-next-line:nx-enforce-module-boundaries
import { CoreModule } from './../../../../libs/core/src/index';
import { environment } from '../environments/environment';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { HomeModule } from './../../../../libs/home/src/index';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { SharedModule } from './../../../../libs/shared/src/index';

// new Agastya(String(process.env.AGASTYA_API_KEY)); // Make sure the environmental variable is a string. // TODO: Uncomment Agastya and fix it on Angular Universal, because now it's breaking after upgrade to Angular 10.

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ditectrevSSR' }), // Unique name across the application. However, some names (e.g. ditectrev.com) causes loosing of defined in component styles.
    CoreModule,
    HomeModule,
    RoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [{ provide: 'googleTagManagerId', useValue: 'GTM-WVLBQKK' }], // TODO: Add other integrations & make "useValue" from "process.env".
})
export class AppModule {}
