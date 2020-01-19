import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-home-assistant-managed',
  templateUrl: './managed.component.html',
  styleUrls: ['./managed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
