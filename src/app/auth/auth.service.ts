import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenExpiringTime = 3540000; // 59 min
  private readonly lcKey = 'authData';

  public isAuth(): boolean {
    const authData = this.getAuthData();
    if (!authData) {
      return false;
    }
    return Date.now() < (authData.authAt + this.tokenExpiringTime);
  }

  public getToken(): string {
    return this.getAuthData()?.token as string;
  }

  public setAuth(token: string): void {
    window.localStorage.setItem(this.lcKey, JSON.stringify({ token, authAt: Date.now() }));
  }

  private getAuthData(): AuthData | null {
    const authDataRaw = window.localStorage.getItem(this.lcKey);
    if (!authDataRaw) {
      return null;
    }
    return JSON.parse(authDataRaw);
  }
}

interface AuthData {
  readonly token: string;
  readonly authAt: number;
}
