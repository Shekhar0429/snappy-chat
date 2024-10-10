import { Component, OnInit } from '@angular/core';
import { AppFacade } from '../app.facade.ts/app.facade';
import { UserInfo } from '../auth/models.ts/sign_up';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../service/service.service';
import { take } from 'rxjs/operators';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

interface AvatarData {
  svgString: string;
  safeUrl: SafeUrl;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo!: UserInfo;
  isHovered = false;
  avatars: any[] = [];
  isloading: boolean = true;
  selectedAvatar!: number;
  constructor(
    private appFacade: AppFacade,
    private router: Router,
    private apiService: ApiService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) {
    this.appFacade.getUserInfo$.subscribe((data) => {
      this.userInfo = data[0];
      if (!this.userInfo) this.router.navigate(['/auth']);
      console.log(this.userInfo);
    });
  }

  ngOnInit(): void {
    if (this.userInfo.isAvatarImageSet) this.router.navigate(['/chat']);
    this.get_set_Avatars();
  }

  avatarUrls: AvatarData[] = [];
  async get_set_Avatars() {
    for (let i = 0; i < 4; i++) {
      const svgString = await this.getAvatar();
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(
        'data:image/svg+xml;base64,' + btoa(svgString)
      );
      this.avatarUrls.push({svgString,safeUrl});
      console.log(this.avatarUrls)
    }
    this.isloading = false;
  }

  getAvatar(): Promise<any> {
    const number = Math.round(Math.random() * 1000);
    return this.apiService.setAvatar(number).pipe().toPromise();
  }

  setProfilePicture() {
    if (this.selectedAvatar === undefined)
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select an avatar',
      });
    else {
      this.apiService
        .updateUserAvatar(
          this.userInfo._id,
          // this.avatars.map(avatar => avatar.svgString);
          // this.avatarUrls.map()
          this.avatarUrls[this.selectedAvatar].svgString
        )
        .subscribe((data) => {
          if (data.isSet) {
            console.log(this.userInfo);
            this.userInfo.isAvatarImageSet = true;
            this.userInfo.avatarImage = data.image;
            this.appFacade.updateUserInfo(this.userInfo);
            this.router.navigate(['/chat'])
            console.log(this.userInfo);
          }
        });
    }
  }
}
