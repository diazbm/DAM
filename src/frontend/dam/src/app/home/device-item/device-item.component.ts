import { Component, OnInit, Input } from '@angular/core';
import { IonItem, IonAvatar, IonLabel, IonButton, IonChip, IonIcon } from '@ionic/angular/standalone';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
  standalone: true,
  imports: [IonItem, IonAvatar, IonLabel, IonButton, IonChip, IonIcon]
})
export class DeviceItemComponent  implements OnInit {
  @Input() device: any = {};
  constructor() {
  }

  ngOnInit() {}

  onClick(dispositivoId:number){
    document.location.href=`/dispositivo/${dispositivoId}`;
  }
}
