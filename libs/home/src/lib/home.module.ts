import { GalleryComponent } from "./gallery/gallery.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
// tslint:disable-next-line:nx-enforce-module-boundaries
import { SharedModule } from "./../../../../libs/shared/src/index";
import { SiriWaveComponent } from "./siriwave/siriwave.component";
import { SliderComponent } from "./slider/slider.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";

@NgModule({
  declarations: [
    GalleryComponent,
    HomeComponent,
    SiriWaveComponent,
    SliderComponent,
    TestimonialsComponent,
  ],
  exports: [
    GalleryComponent,
    HomeComponent,
    SiriWaveComponent,
    SliderComponent,
    TestimonialsComponent,
  ],
  imports: [SharedModule],
})
export class HomeModule {}
