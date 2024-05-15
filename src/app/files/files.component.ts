import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatList, MatListItem, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-files',
  template: `
    <h2>Мои файлы</h2>
    <div class="files-block">
      @for (file of myFiles; track file.name) {
        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>description</mat-icon>
            <mat-card-title>{{ file.name }}</mat-card-title>
            <mat-card-subtitle>{{ file.created | date }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-footer>
            <button mat-icon-button>
              <mat-icon>download</mat-icon>
            </button>
            <button mat-icon-button color="accent" routerLink="edit">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="primary" routerLink="permissions">
              <mat-icon>folder_supervised</mat-icon>
            </button>
            <button mat-icon-button color="warn">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-footer>
        </mat-card>
      }
    </div>

    <h2>Доступные</h2>
    <div class="files-block">
      @for (file of myFiles; track file.name) {
        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>description</mat-icon>
            <mat-card-title>{{ file.name }}</mat-card-title>
            <mat-card-subtitle>{{ file.created | date }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-footer>
            <button mat-icon-button>
              <mat-icon>download</mat-icon>
            </button>
          </mat-card-footer>
        </mat-card>
      }
    </div>

  `,
  styles: `
    mat-card {
      width: 200px;
    }

    .files-block {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      width: 700px;
    }
  `,
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListSubheaderCssMatStyler,
    MatListItem,
    MatIcon,
    DatePipe,
    MatDivider,
    MatCardSubtitle,
    MatCardTitle,
    MatCardFooter,
    MatIconButton,
    RouterLink,
  ],
})
export class FilesComponent {
  readonly myFiles: File[] = [
    {
      name: 'File 1',
      type: 'document',
      created: new Date(),
    },
    {
      name: 'File 2',
      type: 'document',
      created: new Date(),
    },
    {
      name: 'File 3',
      type: 'document',
      created: new Date(),
    },
    {
      name: 'File 4',
      type: 'document',
      created: new Date(),
    },
    {
      name: 'File 5',
      type: 'document',
      created: new Date(),
    },
    {
      name: 'File 6',
      type: 'document',
      created: new Date(),
    },
  ];

  click() {
    console.log('click');
  }
}

interface File {
  readonly name: string;
  readonly type: string;
  readonly created: Date;
}
