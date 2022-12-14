// Brian Langejans: TheBguy87
// Kurt Wietelmann: kwietelmann
// 12/10/2022
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Machine } from '../home-page/home-page.component'

@Component({
  selector: 'app-machine-card',
  templateUrl: './machine-card.component.html',
  styleUrls: ['./machine-card.component.scss']
})
export class MachineCardComponent {
  // input machine and output event
  @Input() machine: Machine;
  @Output() toggleNotifs: EventEmitter<Machine> = new EventEmitter();

  // called when the notification switch has been toggled
  onChange(newMachine: Machine) {
    // emit the new machine with the correct notif switch info
    this.toggleNotifs.emit(newMachine);
  }
}
