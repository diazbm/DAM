import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonBreadcrumbs, IonBreadcrumb, IonFooter, IonTitle, IonToolbar, IonCard, IonButton, IonCardHeader, IonSpinner, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { Measurement } from '../utils/measurement';
import { DeviceService } from 'src/app/services/devices.service';
import { MeasurementsService } from 'src/app/services/measurements.service';
import { IrrigationLogsService } from 'src/app/services/irrigation-logs.service';
import { BuildUrlPipe } from 'src/app/pipes/build-url.pipe';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonBreadcrumbs, IonBreadcrumb, IonFooter, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonSpinner, IonCardTitle, IonCardSubtitle, IonCardContent, CommonModule, FormsModule, BuildUrlPipe]
})
export class DevicePage implements OnInit {
  deviceDetail: any = {};
  electroValveOpen: boolean = false;
  isLoading = true;
  constructor(
    private deviceService: DeviceService,
    private measurementsService: MeasurementsService,
    private irrigationLogsService: IrrigationLogsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('deviceId');

    const id = idParam ? parseInt(idParam, 10) : null;

    if (id === null || isNaN(id)) {
      return;
    }

    this.deviceService.getDeviceById(id).subscribe({
      next: (deviceData) => {
        this.deviceDetail = deviceData;
        const currentHumedity = Measurement.getRandom()
        this.measurementsService.createMeasurement(this.deviceDetail.dispositivoId, currentHumedity).subscribe({
          next: (_) => {
            this.deviceDetail.humedadActual = currentHumedity
            this.irrigationLogsService.getValveLogs(this.deviceDetail.electrovalvulaId).subscribe({
              next: (valveLogs) => {
                let lastValveStatus = false
                if (valveLogs.length > 0) {
                  const lastValveLog: any = valveLogs[0]
                  lastValveStatus = !!(lastValveLog.apertura === 1)
                }
                this.electroValveOpen = lastValveStatus
                this.isLoading = false;
              },
              error: (err) => {
                console.error('Error getting device logs', err);
                this.isLoading = false;
              },
            });
          },
          error: (err) => {
            console.error('Error creating measurement detail:', err);
            this.isLoading = false;
          },
        });
      },
      error: (err) => {
        console.error('Error fetching device detail:', err);
        this.isLoading = false;
      },
    });
  }

  toggleElectrovalvula(): void {
    const nextAperturaValue = this.electroValveOpen ? 0 : 1
    this.irrigationLogsService.createLog(this.deviceDetail.electrovalvulaId, nextAperturaValue).subscribe({
      next: (_) => {
        this.electroValveOpen = !!nextAperturaValue
      },
      error: (err) => {
        console.error('Error creating device log', err);
      },
    });
  }
}
