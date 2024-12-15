import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementHoverEffectDirective } from '../directives/element-hover-effect.directive';
import { IonContent, IonHeader, IonBreadcrumbs, IonBreadcrumb, IonSpinner, IonTitle, IonToolbar, IonItem, IonList, IonLabel } from '@ionic/angular/standalone';
import { MeasurementsService } from '../services/measurements.service';
import { BuildUrlPipe } from 'src/app/pipes/build-url.pipe';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
  standalone: true,
  imports: [ElementHoverEffectDirective, IonContent, IonHeader, IonBreadcrumbs, IonBreadcrumb, IonSpinner, IonTitle, IonToolbar, IonItem, IonList, IonLabel, CommonModule, FormsModule, BuildUrlPipe]
})
export class MeasurementsPage implements OnInit {
  measurments: any[] = []
  deviceId: number = 0
  electrovalveId: number = 0
  isLoading = true

  constructor(
    private activatedRoute: ActivatedRoute,
    private measurementsService: MeasurementsService,
  ) { }

  ngOnInit() {
    const deviceId = this.activatedRoute.snapshot.paramMap.get('deviceId');

    const deviceIdParsed = deviceId ? parseInt(deviceId, 10) : null;

    if (deviceIdParsed === null || isNaN(deviceIdParsed)) {
      return;
    }

    this.deviceId = deviceIdParsed

    this.measurementsService.getMeasurementsByDeviceId(deviceIdParsed).subscribe({
      next: (measurments) => {
        this.measurments = measurments
        this.isLoading = false
      },
      error: (err) => {
        console.error('Error getting device measurments', err);
        this.isLoading = false
      },
    });
  }
}
