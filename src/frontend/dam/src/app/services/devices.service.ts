import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly apiUrl = 'http://localhost:8000/dispositivos';

  constructor(private http: HttpClient) { }

  getDevices(): Observable<string[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getDeviceById(dispositivoId: number): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${dispositivoId}`);
  }
}
