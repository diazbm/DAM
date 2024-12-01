import { Component, OnInit, Input } from '@angular/core';
import { DeviceItemComponent } from '../device-item/device-item.component';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardContent, IonList, IonSpinner } from '@ionic/angular/standalone';
import { DeviceService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss'],
  standalone: true,
  imports: [CommonModule,
    IonCard, IonCardContent, IonList, IonSpinner,
    DeviceItemComponent]
})
export class DevicesListComponent implements OnInit {
  devices: string[] = [];
  isLoading = true;
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe({
      next: (data) => {
        this.devices = data; // Asigna los dispositivos obtenidos
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching devices:', err);
        this.isLoading = false;
      },
    });
  }
}
