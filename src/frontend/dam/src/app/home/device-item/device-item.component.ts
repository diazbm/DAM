import { Component, OnInit, Input } from '@angular/core';
import { IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel]
})
export class DeviceItemComponent  implements OnInit {
  @Input() name: string = '';
  constructor() {
  }

  ngOnInit() {}

}
