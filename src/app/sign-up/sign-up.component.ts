import { Component, inject } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { SignUpData, SignUpService } from './sign-up.service';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        <button (click)="signUp()" [disabled]="signUpForm.invalid" mat-flat-button color="primary">Зарегистрироваться</button>
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
  providers: [SignUpService],
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
  private readonly signUpService = inject(SignUpService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  public readonly signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  signUp(): void {
    this.signUpService.signUp(this.signUpForm.value as SignUpData).subscribe({
      next: (result) => {
        this.authService.setAccessToken(result.token);
        this.router.navigate(['/files']);
      },
      error: () => {
        this.snackBar.open('Проверьте форму');
      }
    });
  }
}
