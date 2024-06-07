import { Component, inject } from '@angular/core';
import { FileCardComponent } from './file-card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DownloadFileDialogComponent } from '../download-file-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-own-file-card',
  template: `
    <app-file-card [file]="file()">
      <button mat-icon-button (click)="downloadFile()">
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
    </app-file-card>
  `,
  standalone: true,
  imports: [
    FileCardComponent,
    MatIcon,
    MatIconButton,
    RouterLink
  ]
})
export class OwnFileCardComponent extends FileCardComponent {
  private readonly dialog = inject(MatDialog);

  public downloadFile(): void {
    this.dialog.open(DownloadFileDialogComponent, {
      data: this.file(),
    });
  }
}
