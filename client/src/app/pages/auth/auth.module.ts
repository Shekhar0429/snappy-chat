import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppFacade } from '../app.facade.ts/app.facade';

import { userInfoFeaturekey } from '../store/selectors/user.info.selectors';
import { userReducers } from '../store/reducers/user.info.reducers';
import { UsersEffects } from '../store/effects/user.info.effects';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    // StoreModule.forRoot({}), 
    // EffectsModule.forRoot([]),
    StoreModule.forFeature(userInfoFeaturekey, userReducers),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [MessageService, AppFacade],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AuthModule {}
