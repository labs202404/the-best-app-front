import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-drag-field',
  template: `
    <mat-icon>upload</mat-icon>
    <h2>Отпустите файл, чтобы загрузить</h2>
  `,
  styles: `
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      position: fixed;
      justify-content: center;
      align-items: center;
      background-color: #dadada;
    }
  `,
  standalone: true,
  imports: [
    MatIcon
  ]
})
export class DragFieldComponent {}
