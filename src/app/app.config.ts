import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig } from '@angular/core';
import { BASE_PATH } from '../api';
import { environment } from '../environments/environment';
import { ItemService } from './item.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideAnimations(),
        { provide: BASE_PATH, useValue: environment.apiUrl },
        ItemService,
    ]
};
