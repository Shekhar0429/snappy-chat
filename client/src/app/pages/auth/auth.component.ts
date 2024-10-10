import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from './auth.service';
import { SignUpLoginDetail, UserInfo } from './models.ts/sign_up';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserInfoState } from '../store/state/user.info.state';
import { AppFacade } from '../app.facade.ts/app.facade';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(
    private messageService: MessageService,
    private apiService: AuthService,
    private router: Router,
    private appFacade: AppFacade
  ) {
    this.appFacade.getUserInfo$.pipe().subscribe((user: UserInfo[]) => {
      console.log(user)
      if (user.length) {
        if (user[0].isAvatarImageSet) {
          this.router.navigate(['/chat']);
        } else {
          this.router.navigate(['/profile']);
        }
      }else{
        this.appFacade.getUserInfo();
      }
    });
  }

  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  activeIndex: number = 0;

  ngOnInit(): void {
    // this.getUserInfoFromServer();

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.signUpForm = new FormGroup({
      username:new FormControl('',Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
    console.log(this.activeIndex);
  }

  // async getUserInfoFromServer() {
  //   try {
  //     const userInfo: UserInfo = await this.appFacade.getUserInfo$
  //       .pipe(take(1))
  //       .toPromise();
  //     console.log(userInfo);
  //     if (!userInfo._id) {
  //       this.appFacade.getUserInfo();
  //       return;
  //     }
  //     // if (userInfo && !userInfo.profileSetup) {
  //     //   // this.messageService.showContrast('Please set profile to continue');
  //     //   this.router.navigate(['/profile']);
  //     //   return;
  //     // }
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // }

  showContrast(message: string) {
    this.messageService.add({
      severity: 'contrast',
      summary: 'Error',
      detail: message,
    });
  }

  onFormSubmit() {
    switch (this.activeIndex) {
      case 0:
        this.login();
        break;

      case 1:
        this.signUp();
        break;

      default:
        break;
    }
  }

  login() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      return this.showContrast('Please provide and password');
    }
    const user: SignUpLoginDetail = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.appFacade.loggingInUser(user);
    this.apiService.login(user).subscribe(
      (res) => {
        console.log(res);
        if (res.data.user._id) {
          if (res.data.user.profileSetup) this.router.navigate(['/chat']);
          else this.router.navigate(['/profile']);
        }
      },
      (error) => {
        this.showContrast(error.error.message);
      }
    );
  }

  signUp() {
    if (!this.signUpForm.value.email) {
      this.showContrast('Email is required');
      return;
    } else if (
      this.signUpForm.value.password !== this.signUpForm.value.confirmPassword
    ) {
      this.showContrast('Password doesnt match');
      return;
    }

    const newUser: SignUpLoginDetail = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };
    this.apiService.signUp(newUser).subscribe((res) => {
      if (res.status === 'success') this.router.navigate(['/profile']);
    });
  }
}
