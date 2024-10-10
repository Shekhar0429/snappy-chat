import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { take, tap } from 'rxjs/operators';
import { AppFacade } from '../../app.facade.ts/app.facade';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {}

  logoutUser() {
    this.service
      .logOut()
      .pipe(take(1))
      .subscribe(() => {
        // this.appFacade.clearState();
        // this.router.navigate(['/auth']);
      });
  }
}
