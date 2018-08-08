import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { CamelizePipe } from 'ngx-pipes';

import { MapService } from './map.service';
import { MapComponent } from './map.component';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3F-A1iFMo01oD2wXV1eTKagMzlRXWtHk '
    })
  ],
  exports: [MapComponent],
  declarations: [MapComponent],
  providers: [MapService, CamelizePipe]
})
export class MapModule { }
