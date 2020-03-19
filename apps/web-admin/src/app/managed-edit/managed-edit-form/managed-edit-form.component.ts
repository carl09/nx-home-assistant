import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  deviceTraits,
  deviceTypes,
  IManagedDeviceModel,
  namedLog
} from '@nx-home-assistant/common';

const log = namedLog('ManagedEditFormComponent');

interface Entity {
  text: string;
  value: string;
}

interface EntityGroup {
  name: string;
  entities: Entity[];
}

@Component({
  selector: 'nx-home-assistant-managed-edit-form',
  templateUrl: './managed-edit-form.component.html',
  styleUrls: ['./managed-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedEditFormComponent implements OnInit, OnChanges {
  @Input() device: IManagedDeviceModel;
  @Input() entitiesGrouped: EntityGroup[];

  @Output() save: EventEmitter<IManagedDeviceModel> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  deviceTypes: Entity[];
  deviceTraits: string[];

  form: FormGroup;

  constructor() {
    this.deviceTypes = deviceTypes.map(x => {
      return {
        value: x.code,
        text: x.name
      };
    });

    this.deviceTraits = deviceTraits;

    this.form = new FormGroup({
      name: new FormControl(''),
      entityId: new FormControl(''),
      deviceType: new FormControl(''),
      localId: new FormControl(''),
      traits: new FormControl()
    });
  }

  ngOnInit(): void {
    log.info('[ManagedEditComponent] ngOnInit', this.device);

    if (this.device) {
      this.form.patchValue(this.device);
    } else {
      this.form.reset();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    log.info('[ManagedEditComponent] ngOnChanges', changes);

    if (changes.device) {
      if (changes.device.currentValue) {
        this.form.patchValue(changes.device.currentValue);
      } else {
        this.form.reset();
      }
    }
  }

  public onSubmit(value: IManagedDeviceModel) {
    const device = {
      ...this.device,
      ...value
    };
    log.info('[ManagedEditComponent] onSubmit', device);
    this.save.emit(device);
  }

  public onCancel() {
    log.info('[ManagedEditComponent] onCancel');
    this.cancel.emit();
  }

  public onDelete() {
    log.info('[ManagedEditComponent] onDelete', this.device.id);
    this.delete.emit(this.device.id);
  }
}
