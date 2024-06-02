import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SignUpService {
  private readonly http = inject(HttpClient);

  public signUp(data: SignUpData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/auth/sign-up', data);
  }
}

export interface SignUpData {
  readonly name: string;
  readonly userName: string;
  readonly password: string;
  readonly email: string;
}
