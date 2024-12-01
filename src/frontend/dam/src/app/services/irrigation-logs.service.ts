import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateTimeFormat } from '../utils/datetime';

@Injectable({
  providedIn: 'root',
})
export class IrrigationLogsService {
  private readonly apiUrl = 'http://localhost:8000/log_riegos';

  constructor(private http: HttpClient) { }

  createLog(electrovalvulaId: number, apertura: number): Observable<string[]> {
    const body = {
      electrovalvulaId,
      fecha: DateTimeFormat.getCurrent(),
      apertura
    }
    return this.http.post<any[]>(this.apiUrl, body);
  }
  getValveLogs(electrovalvulaId: number): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${electrovalvulaId}`);
  }
}
