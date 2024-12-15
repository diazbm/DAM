import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DateTimeFormat } from '../utils/datetime';

@Injectable({
  providedIn: 'root',
})
export class MeasurementsService {
  private readonly apiUrl = 'http://localhost:8000/mediciones';

  constructor(private http: HttpClient) { }

  createMeasurement(dispositivoId: number, valor: string): Observable<string[]> {
    const body = {
      dispositivoId,
      fecha: DateTimeFormat.getCurrent(),
      valor
    }
    return this.http.post<any[]>(this.apiUrl, body);
  }

  getMeasurementsByDeviceId(dispositivoId: number): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${dispositivoId}`);
  }
}
