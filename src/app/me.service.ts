import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserInfo {
  firstname: string;
  lastname: string;
  complex: 500;
  apartId: 108;
  userId: string;
  landlord: boolean;
  complexName: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private user: UserInfo | null = null;

  constructor(private http: HttpClient) {}

  /**
   * getUserInfo
   */
  public getUserInfo() {
    this.http
      .get<UserInfo>('http://localhost/homeset/api/me', {
        responseType: 'json',
      })
      .subscribe((user: UserInfo) => {
        this.user = user;
      });
  }

  get userInfo(): UserInfo | null {
    return this.user;
  }

  public clear(): void {
    this.user = null;
  }
}
