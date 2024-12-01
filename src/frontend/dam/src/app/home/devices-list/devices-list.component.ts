import { Component, OnInit, Input } from '@angular/core';
import { DeviceItemComponent } from '../device-item/device-item.component';
import { CommonModule } from '@angular/common';
import { IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, DeviceItemComponent],
})
export class DevicesListComponent  implements OnInit {
  @Input() devices: any = [];
  constructor() {}

  ngOnInit() {
    this.devices = ['Device 1', 'Device 2', 'Device 3'];
  }
}
