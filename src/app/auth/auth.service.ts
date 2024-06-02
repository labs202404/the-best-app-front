import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken?: string;

  public isAuth(): boolean {
    return this.accessToken !== undefined;
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
  }
}
