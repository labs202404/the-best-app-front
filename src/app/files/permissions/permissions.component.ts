import { Component } from '@angular/core';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader, MatCardTitle,
} from '@angular/material/card';
import { User } from '../../user/user';
import { MatList, MatListItem, MatListOption, MatSelectionList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-permissions',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Доступ к файлу</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-selection-list>
          @for (user of users; track user.userName) {
            <mat-list-option>
              <mat-icon matListItemIcon>user</mat-icon>
              <div matListItemTitle>{{user.userName}}</div>
              <div matListItemLine>{{user.email}}</div>
            </mat-list-option>
          }
        </mat-selection-list>
      </mat-card-content>
      <mat-divider></mat-divider>
      <mat-card-actions>
        <mat-form-field>
          <mat-label>Почта пользователя</mat-label>
          <input matInput type="email">
        </mat-form-field>
        <button mat-flat-button color="primary">Предоставить доступ</button>
      </mat-card-actions>

    </mat-card>
  `,
  styles: `
    mat-card {
      width: 500px;
    }
  `,
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatCardTitle,
    MatListItem,
    MatIcon,
    MatList,
    MatSelectionList,
    MatListOption,
    MatDivider,
    MatCardActions,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,

  ]
})
export class PermissionsComponent {
  public readonly users: User[] = [
    {
      userName: 'user_1',
      email: 'user_1@gmail.com',
    },
    {
      userName: 'user_2',
      email: 'user_2@gmail.com',
    },
  ]
}
