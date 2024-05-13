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
        <mat-card-subtitle>Регистрация</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="sign-up-form" [formGroup]="signUpForm">
          <mat-form-field>
            <mat-label>Имя</mat-label>
            <input formControlName="name" matInput>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Имя пользователя</mat-label>
            <input formControlName="userName" placeholder="sample_user" matInput>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Почта</mat-label>
            <input formControlName="email" placeholder="example@mail.com" matInput type="email">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Пароль</mat-label>
            <input formControlName="password" matInput type="password">
          </mat-form-field>
        </div>
      </mat-card-content>
      <mat-card-footer>
        <button routerLink="/files" [disabled]="signUpForm.invalid" mat-flat-button color="primary">Зарегистрироваться</button>
      </mat-card-footer>
    </mat-card>
  `,
  styles: `
    mat-card {
      width: 500px;
    }

    .sign-up-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
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
export class SignUpComponent {
  public readonly signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
}
