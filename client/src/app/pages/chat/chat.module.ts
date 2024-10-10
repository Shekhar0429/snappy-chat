import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { LogoutComponent } from './logout/logout.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { MessagesComponent } from './Messages/messages.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    ChatComponent,
    ContactsComponent,
    WelcomeComponent,
    ChatContainerComponent,
    LogoutComponent,
    ChatInputComponent,
    MessagesComponent,
  ],
  imports: [CommonModule, ChatRoutingModule,PickerModule],
})
export class ChatModule {}
