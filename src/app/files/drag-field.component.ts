import { Component, HostListener, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { debounceTime, Subject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-drag-field',
  template: `
    @if (showDragField()) {
      <mat-icon>upload</mat-icon>
      <h2>Отпустите файл, чтобы загрузить</h2>
    }
  `,
  host: {
    '[class.drag-field-visible]': 'showDragField()'
  },
  styles: `
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      position: fixed;
      justify-content: center;
      align-items: center;
    }

    :host(.drag-field-visible) {
      background-color: #dadada;
    }
  `,
  standalone: true,
  imports: [
    MatIcon,
    AsyncPipe,
    NgIf
  ]
})
export class DragFieldComponent {
  private readonly showDragFieldSubject = new Subject<boolean>();

  public readonly showDragField = toSignal(this.showDragFieldSubject.pipe(debounceTime(10)));

  public readonly dropped = output<File>();

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.showDragFieldSubject.next(true);
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.showDragFieldSubject.next(false);

  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.showDragFieldSubject.next(false);
    this.dropped.emit(evt.dataTransfer?.files[0] as File);
  }
}
