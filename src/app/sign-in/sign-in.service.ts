import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SignInService {
  private readonly http = inject(HttpClient);

  public signIn(data: SignInData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/auth/sign-in', data);
  }
}

export interface SignInData {
  readonly userName: string;
  readonly password: string;
}
