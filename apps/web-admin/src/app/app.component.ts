import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nx-home-assistant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'web-admin';
}
