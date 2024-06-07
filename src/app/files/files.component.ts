import { Component, inject } from '@angular/core';
import { DragFieldComponent } from './drag-field.component';
import { merge, Observable, Subject, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilesService, UserFiles } from './files.service';
import { FileCardComponent } from './file-card/file-card';
import { OwnFileCardComponent } from './file-card/own-file-card.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-files',
  template: `
    <ng-container *ngIf="myFiles$ | async as myFiles">
      <h2>Мои файлы</h2>
      <div class="files-block">
        @for (file of myFiles.owner; track file.id) {
          <app-own-file-card [file]="file"></app-own-file-card>
        }
      </div>

      <h2>Доступные</h2>
      <div class="files-block">
        @for (file of myFiles.owner; track file.name) {
          <app-file-card [file]="file"></app-file-card>
        }
      </div>
    </ng-container>
    <app-drag-field (dropped)="uploadFile($event)"></app-drag-field>
  `,
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10%;
    }

    app-file-card, app-own-file-card {
      width: calc((100% - 15px * 2) / 3);
    }

    .files-block {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }
  `,
  standalone: true,
  imports: [
    OwnFileCardComponent,
    NgIf,
    AsyncPipe,
    FileCardComponent,
    DragFieldComponent,
    AsyncPipe,
    NgIf
  ],
})
export class FilesComponent {
  private readonly snackBar = inject(MatSnackBar);
  private readonly filesService = inject(FilesService);
  private readonly updates$ = new Subject<UserFiles>();

  public readonly myFiles$: Observable<UserFiles> = merge(
    this.filesService.getFiles(),
    this.updates$,
  )

  public uploadFile(file: File) {
    this.filesService.uploadFile(file).pipe(
      tap(() => this.snackBar.open('Файл был загружен')),
      switchMap(() => this.filesService.getFiles()),
    ).subscribe({
      next: (data) =>  this.updates$.next(data),
      error: () => this.snackBar.open('Ошибка при загрузке файла'),
    });
  }
}
