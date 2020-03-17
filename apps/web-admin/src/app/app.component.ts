import { environment } from '../environments/environment';
import { ManagedDevicesService } from './services/managed-devices.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerTransition } from './router.animations';

@Component({
  selector: 'nx-home-assistant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition],
})
export class AppComponent implements OnInit {
  private previousPath: string = '';

  constructor(private managedDevicesService: ManagedDevicesService) {}

  ngOnInit(): void {
    this.managedDevicesService.init(environment.devicesRestUri);
  }

  getPageTransition(routerOutlet: RouterOutlet) {
    if (routerOutlet.isActivated) {
      let transitionName = 'section';

      const { path } = routerOutlet.activatedRoute.routeConfig;
      const isSame = this.previousPath === path;
      const isBackward = this.previousPath.startsWith(path);
      const isForward = path.startsWith(this.previousPath);

      if (isSame) {
        transitionName = 'none';
      } else if (isBackward && isForward) {
        transitionName = 'initial';
      } else if (isBackward) {
        transitionName = 'backward';
      } else if (isForward) {
        transitionName = 'forward';
      }

      this.previousPath = path;

      return transitionName;
    }
  }
}
