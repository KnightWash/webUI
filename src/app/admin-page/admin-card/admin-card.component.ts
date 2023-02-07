import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Machine } from '../../admin-page/admin-page.component'

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent {
  // input machine and output event for updating notif switch
  @Input() machine: Machine;
  @Output() toggleOffline: EventEmitter<Machine> = new EventEmitter();

  onChange(newMachine: Machine) {
    this.toggleOffline.emit(newMachine);
    console.log(this.machine.status)
  }
}
