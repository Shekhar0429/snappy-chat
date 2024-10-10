import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const api = 'https://api.multiavatar.com/45678945';
const updateAvatar = URL + '/api/auth/setAvatar';
const getAllUserContactsUrl = URL + '/api/auth//allUsers/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  setAvatar(num: number): Observable<any> {
    return this.http.get(api + num, { responseType: 'text' });
  }

  updateUserAvatar(userId: string, avatar: string): Observable<any> {
    const param = updateAvatar + `/${userId}`;
    return this.http.post(param, {
      image: avatar,
    });
  }

  getAllUserContacts(id: string): Observable<any> {
    const url = getAllUserContactsUrl + id;
    return this.http.get(url);
  }
}
