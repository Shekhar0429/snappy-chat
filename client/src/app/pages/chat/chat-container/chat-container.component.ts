import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../auth/models.ts/sign_up';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {

  constructor() { }

  @Input() userInfo!:UserInfo;
  @Input() selectedChat:any;

  ngOnInit(): void {
    console.log(this.selectedChat)
  }

}
