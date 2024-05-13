import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>The Best App</mat-card-title>
        <mat-card-subtitle>Вход</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="sign-in-form" [formGroup]="signInForm">
          <mat-form-field>
            <mat-label>Имя пользователя</mat-label>
            <input formControlName="userName" placeholder="sample_user" matInput>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Пароль</mat-label>
            <input formControlName="password" matInput type="password">
          </mat-form-field>
        </div>
      </mat-card-content>
      <mat-card-footer>
        <button routerLink="/files" [disabled]="signInForm.invalid" mat-flat-button color="primary">Войти</button>
        <button mat-button class="signup-btn" color="primary" routerLink="/signup">Нет аккаунта?</button>
      </mat-card-footer>
    </mat-card>
  `,
  styles: `
    mat-card {
      width: 500px;
    }

    .sign-in-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .signup-btn {
      margin-left: 10px;
    }
  `,
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    MatCardHeader,
    MatCardFooter,
    MatButton,
    ReactiveFormsModule,
    RouterLink,
  ]
})
export class SignInComponent {
  public readonly signInForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
}
