import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Machine } from '../../home-page/home-page.component'

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent {
  // input machine and output event for updating offline switch
  @Input() machine: Machine;
  @Output() toggleOffline: EventEmitter<Machine> = new EventEmitter();

  onChange(newMachine: Machine) {
    this.toggleOffline.emit(newMachine);
    //console.log("status of machine from card: " + newMachine.status);
    //console.log("status of toggle from card: " + newMachine.offlineOn);
  }
}
