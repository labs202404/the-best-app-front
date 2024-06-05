import { Component, HostListener, inject } from '@angular/core';
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
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DragFieldComponent } from './drag-field.component';
import { debounceTime, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilesService } from './files.service';

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
    <app-drag-field *ngIf="showDragField$ | async"></app-drag-field>

  `,
  styles: `
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

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
    DragFieldComponent,
    NgIf,
    AsyncPipe,
  ],
})
export class FilesComponent {
  private readonly snackBar = inject(MatSnackBar);
  private readonly showDragFieldSubject = new Subject<boolean>();
  private readonly filesService = inject(FilesService);

  readonly myFiles: ServerFile[] = [];


  public readonly showDragField$ = this.showDragFieldSubject.pipe(debounceTime(10));

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.showDragFieldSubject.next(true);
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.showDragFieldSubject.next(false);

  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.showDragFieldSubject.next(false);
    this.uploadFile(evt.dataTransfer?.files[0] as File);
  }

  private uploadFile(file: File) {
    this.filesService.uploadFile(file).subscribe({
      next: () => this.snackBar.open('Файл был загружен'),
      error: () => this.snackBar.open('Ошибка при загрузке файла')
    });
  }
}

interface ServerFile {
  readonly name: string;
  readonly type: string;
  readonly created: Date;
}
