import { Component, OnInit, Input } from '@angular/core';
import { IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { ElementHoverEffectDirective } from '../../directives/element-hover-effect.directive';
import { BuildUrlPipe } from 'src/app/pipes/build-url.pipe';

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
  standalone: true,
  imports: [IonItem, IonAvatar, IonLabel, BuildUrlPipe, ElementHoverEffectDirective]
})
export class DeviceItemComponent  implements OnInit {
  @Input() device: any = {};
  constructor() {
  }

  ngOnInit() {}
}
