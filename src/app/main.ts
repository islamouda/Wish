import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';


import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';


platformBrowserDynamic().bootstrapModule(AppModule);
