import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AppFacade } from '../../app.facade.ts/app.facade';
import { Router } from '@angular/router';
import { UserInfo } from '../../auth/models.ts/sign_up';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  @Input() userInfo!: UserInfo;
  constructor(
    private appFacade: AppFacade,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  currentUserName: string = '';
  currentUserImage: SafeUrl = '';
  currentSelected!: number;

  @Input() contacts: any[] = [];
  @Output() setSelectedChat = new EventEmitter<any>();

  ngOnInit(): void {
    if (!this.userInfo) this.router.navigate(['/profile']);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.userInfo) {
      this.currentUserImage = this.sanitizer.bypassSecurityTrustUrl(
        'data:image/svg+xml;base64,' + btoa(this.userInfo.avatarImage)
      );
      this.userInfo.avatarImage;
      this.currentUserName = this.userInfo.username;
    }

    this.contacts = this.contacts.map((avatar) => ({
      ...avatar,
      svgString: avatar.avatarImage,
      safeUrl: this.sanitizer.bypassSecurityTrustUrl(
        'data:image/svg+xml;base64,' + btoa(avatar.avatarImage)
      ),
    }));
  }

  getSelectedChat(index: number, chatWithUser: any) {
    this.currentSelected = index;
    this.setSelectedChat.emit({ index, chatWithUser });
  }
}
