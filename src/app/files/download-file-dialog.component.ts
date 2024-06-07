import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FilesService, ServerFile } from './files.service';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-download-file-dialog',
  template: `
    <h2 mat-dialog-title>Загрузка файла</h2>
    <mat-dialog-content>
      <a *ngIf="downloadLink$ | async as download; else load" [href]="download" target="_blank" [download]="fileName">
        Ссылка на загрузку
      </a>
      <ng-template #load>
        <h3>Готовится ссылка на скачивание</h3>
      </ng-template>
    </mat-dialog-content>
  `,
  styles: ``,
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    AsyncPipe,
    NgIf
  ]
})
export class DownloadFileDialogComponent {
  private readonly serverFile: ServerFile = inject(MAT_DIALOG_DATA);
  private readonly filesService = inject(FilesService);

  public readonly fileName = this.serverFile.name;

  public readonly downloadLink$ = this.filesService.downloadFile(this.serverFile.id).pipe(
    map((blob) => URL.createObjectURL(blob)),
  );
}
