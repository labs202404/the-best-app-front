import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCard, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ServerFile } from '../files.service';

@Component({
  selector: 'app-file-card',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-icon mat-card-avatar>description</mat-icon>
        <mat-card-title>{{ file().name }}</mat-card-title>
        <mat-card-subtitle>{{ file().createdAt | date }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-footer>
        <ng-content></ng-content>
      </mat-card-footer>
    </mat-card>
  `,
  styles: ``,
  standalone: true,
  imports: [
    DatePipe,
    MatCard,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    RouterLink
  ]
})
export class FileCardComponent {
  readonly file = input.required<ServerFile>();
}
