import { environment } from '../environments/environment';
import { ManagedDevicesService } from './services/managed-devices.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-home-assistant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private managedDevicesService: ManagedDevicesService) {}

  ngOnInit(): void {
    this.managedDevicesService.init(environment.devicesRestUri);
  }
}
