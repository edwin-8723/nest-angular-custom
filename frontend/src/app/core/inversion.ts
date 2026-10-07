import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateInversion, Inversion } from '../models/inversion';

@Injectable({ providedIn: 'root' })
export class InversionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/inversiones';

  getAll(): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(this.apiUrl);
  }

  getAllByUser(userId: number): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(`${this.apiUrl}/user/${userId}`);
  }

  create(userId: number, inversion: CreateInversion): Observable<Inversion> {
    return this.http.post<Inversion>(
      `${this.apiUrl}/user/${userId}`,

      inversion,
    );
  }

  delete(userId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${userId}/${id}`);
  }
}
