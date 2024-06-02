import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenExpiringTime = 3540000; // 59 min
  private readonly lcKey = 'authData';

  public isAuth(): boolean {
    const authDataRaw = localStorage.getItem(this.lcKey);
    if (!authDataRaw) {
      return false;
    }
    const authData = JSON.parse(authDataRaw) as AuthData;
    return Date.now() < (authData.authAt + this.tokenExpiringTime);
  }

  public setAuth(token: string): void {
    window.localStorage.setItem(this.lcKey, JSON.stringify({ token, authAt: Date.now() }));
  }
}

interface AuthData {
  readonly token: string;
  readonly authAt: number;
}
