/// <reference types="@angular/localize" />
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap JS (Popper.js szükséges a menük és egyéb elemekhez)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
