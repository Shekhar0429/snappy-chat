import { Component, OnInit } from '@angular/core';
import { AppFacade } from '../app.facade.ts/app.facade';
import { UserInfo } from '../auth/models.ts/sign_up';
import { ToastrService } from 'src/app/utils/toastr.service';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { ApiService } from '../service/service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  userInfo!: UserInfo;

  constructor(
    private appFacade: AppFacade,
    private messageService: ToastrService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.appFacade.getUserInfo$
      .pipe(
        take(1),
        tap((data) => {
          this.userInfo = data[0];
          if (!this.userInfo) {
            this.router.navigate(['/profile']);
          }
        })
      )
      .subscribe();
  }

  contacts: any[] = [];

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    if (this.userInfo && this.userInfo.isAvatarImageSet) {
      this.apiService
        .getAllUserContacts(this.userInfo._id)
        .pipe(take(1))
        .subscribe((data) => {
          this.contacts = data;
          console.log(data);
        });
    }
  }

  selectedChat: any;

  setSelectedChat(getSelectedChat: any) {
    this.selectedChat = getSelectedChat;
  }
}
