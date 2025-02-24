import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import{ defineCustomElements }from'@npm-bbta/bbog-dig-dt-sherpa-lib/loader';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

defineCustomElements();

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    importProvidersFrom(HttpClientModule)
  ]
})
.catch((err) => console.error(err));
