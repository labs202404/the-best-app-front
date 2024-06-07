import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  public uploadFile(file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:3000/files/upload', formData, { headers: {
        'Authorization': `Bearer ${this.auth.getToken()}`,
      }});
  }

  public getFiles(): Observable<UserFiles> {
    return this.http.get<UserFiles>('http://localhost:3000/files', {
      headers: {
        'Authorization': `Bearer ${this.auth.getToken()}`,
      }
    });
  }

  public downloadFile(fileId: string): Observable<Blob> {
    return this.http.get(`http://localhost:3000/files/download/${fileId}`, {
      headers: { 'Authorization': `Bearer ${this.auth.getToken()}`},
      responseType: 'blob',
    });
  }
}

export interface UserFiles {
  readonly owner: ServerFile[];
}

export interface ServerFile {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly ownerId: string;
  readonly createdAt: Date;
}
