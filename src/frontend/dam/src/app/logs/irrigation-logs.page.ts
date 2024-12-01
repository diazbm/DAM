import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonBreadcrumbs, IonBreadcrumb, IonSpinner, IonTitle, IonToolbar, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { IrrigationLogsService } from '../services/irrigation-logs.service';
import { BuildUrlPipe } from 'src/app/pipes/build-url.pipe';

@Component({
  selector: 'app-irrigation-logs',
  templateUrl: './irrigation-logs.page.html',
  styleUrls: ['./irrigation-logs.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonBreadcrumbs, IonBreadcrumb, IonSpinner, IonTitle, IonToolbar, IonItem, IonList, IonLabel, CommonModule, FormsModule, BuildUrlPipe]
})
export class IrrigationLogsPage implements OnInit {
  logs: any[] = []
  deviceId: number = 0
  electrovalveId: number = 0
  isLoading = true

  constructor(
    private activatedRoute: ActivatedRoute,
    private irrigationLogsService: IrrigationLogsService,
  ) { }

  ngOnInit() {
    const deviceId = this.activatedRoute.snapshot.paramMap.get('deviceId');
    const electrovalveId = this.activatedRoute.snapshot.paramMap.get('electrovalveId');

    const deviceIdParsed = deviceId ? parseInt(deviceId, 10) : null;
    const electrovalveIdParsed = electrovalveId ? parseInt(electrovalveId, 10) : null;

    if (deviceIdParsed === null || isNaN(deviceIdParsed) || electrovalveIdParsed === null || isNaN(electrovalveIdParsed)) {
      return;
    }

    this.deviceId = deviceIdParsed
    this.electrovalveId = electrovalveIdParsed

    this.irrigationLogsService.getValveLogs(electrovalveIdParsed).subscribe({
      next: (valveLogs) => {
        this.logs = valveLogs
        this.isLoading = false
      },
      error: (err) => {
        console.error('Error getting device logs', err);
        this.isLoading = false
      },
    });
  }
}
