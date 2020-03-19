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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  deviceTraits,
  deviceTypes,
  IManagedDeviceModel,
  namedLog
} from '@nx-home-assistant/common';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { IOption } from '../../models/options.model';

const log = namedLog('ManagedEditFormComponent');

interface EntityGroup {
  name: string;
  entities: IOption[];
}

@Component({
  selector: 'nx-home-assistant-managed-edit-form',
  templateUrl: './managed-edit-form.component.html',
  styleUrls: ['./managed-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagedEditFormComponent implements OnInit, OnChanges {
  @Input() device: IManagedDeviceModel;
  @Input() entitiesGrouped: IOption[];

  @Output() save: EventEmitter<IManagedDeviceModel> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  deviceTypes: IOption[];
  deviceTraits: IOption[];

  filteredEntitiesGrouped$: Observable<EntityGroup[]>;

  form: FormGroup;

  constructor() {
    this.deviceTypes = deviceTypes.map(x => {
      return {
        value: x.code,
        text: x.name
      };
    });

    this.deviceTraits = deviceTraits.map(x => {
      return {
        text: x,
        value: x
      };
    });

    this.form = new FormGroup({
      name: new FormControl(''),
      entityId: new FormControl('', Validators.required),
      deviceType: new FormControl('', Validators.required),
      localId: new FormControl(''),
      traits: new FormControl('', Validators.required)
    });

    this.filteredEntitiesGrouped$ = this.form.get('entityId').valueChanges.pipe(
      startWith(''),
      map(value => {
        const filterValue = value.toLowerCase();
        return this.entitiesGrouped.filter(option => {
          return (
            option.text.toLowerCase().includes(filterValue) ||
            option.value.toLowerCase().includes(filterValue)
          );
        });
      }),
      map(x => {
        const group: { [key: string]: EntityGroup } = {};
        x.forEach(y => {
          const [type] = y.value.split('.');
          if (!(type in group)) {
            group[type] = {
              name: type,
              entities: []
            };
          }
          group[type].entities.push({
            text: y.text,
            value: y.value
          });
        });

        return Object.keys(group).map(y => group[y]);
      }),
      tap(x => log.info('filteredEntitiesGrouped', x))
    );
  }

  ngOnInit(): void {
    log.info('ngOnInit', this.device);

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

  onSubmit(value: IManagedDeviceModel) {
    const device = {
      ...this.device,
      ...value
    };
    log.info('[ManagedEditComponent] onSubmit', device);
    this.save.emit(device);
  }

  onCancel() {
    log.info('[ManagedEditComponent] onCancel');
    this.cancel.emit();
  }

  onDelete() {
    log.info('[ManagedEditComponent] onDelete', this.device.id);
    this.delete.emit(this.device.id);
  }

  trackByEntityGroup(_index: number, item: EntityGroup) {
    return item.name;
  }

  trackByOption(_index: number, item: IOption) {
    return item.value;
  }
}
