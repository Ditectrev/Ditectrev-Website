import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HttpClientJsonpModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  exports: [BrowserAnimationsModule, HttpClientModule, HttpClientJsonpModule],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ditectrevSSR' }), // Unique name across the application. However, some names (e.g. ditectrev.com) causes loosing of defined in component styles.,,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    // TODO: server is needed to have it working, and looks like useless without any login/logout.
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
})
// TODO: Make unit test for this.
export class CoreModule {
  // Throw an error once CoreModule will be imported somewhere else in order to prevent from importing it more than once in the whole application.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
