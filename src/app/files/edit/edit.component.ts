import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  import { FilesComponent } from '../files.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
    selector: 'app-files-edit',
    template: `
      <mat-card>
    <mat-card-header>
    <mat-card-title> File name</mat-card-title>
    <mat-card-subtitle>Изменить имя файла</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
        <div [formGroup]="fileEditForm">
            <mat-form-field>
                <input formControlName="newName" placeholder="Новое имя файла" matInput>
            </mat-form-field>
        </div>
    </mat-card-content>
    <mat-card-footer>
        <button routerLink="/files" mat-flat-button color="primary" [disabled]="fileEditForm.invalid">Сохранить</button>
        <button routerLink="/files" mat-button color="primary">Отмена</button>
    </mat-card-footer>

    </mat-card>
    `,
    styles: `
    mat-card {
        width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    mat-card-title {
        font-size: 25px;
        margin-bottom: 10px;
    }
   mat-form-field {
    width:100%;
     margin-bottom: 70px;
   }
    mat-card-footer {
        text-align: center;
    }
    `,
    standalone: true,
    imports: [RouterLink,
        MatCard,
        MatCardContent,
        MatCardFooter,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatFormField,
        MatLabel,
        MatInput,
        FilesComponent,
        ReactiveFormsModule,
        MatButton,
    ],
})

export class FilesEditComponent {
     readonly fileEditForm = new FormGroup({
        newName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    });
}
