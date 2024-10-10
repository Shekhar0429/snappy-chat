import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../auth/models.ts/sign_up';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  @Input() userInfo!: UserInfo;

  ngOnInit(): void {}
}
