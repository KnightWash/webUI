import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Machine } from '../home-page/home-page.component';

@Component({
  selector: 'app-admin-toggle',
  templateUrl: './admin-toggle.component.html',
  styleUrls: ['./admin-toggle.component.scss']
})
export class AdminToggleComponent {
  @Input() machine: Machine;
  @Output() toggleOffline: EventEmitter<Machine> = new EventEmitter();
  newSwitchVal = false;

  ngOnInit() {
    this.changeState();
  }

  onChange($event: MatSlideToggleChange) {
    this.changeState();
  }

  changeState(){
    console.log(this.newSwitchVal);
    if (this.newSwitchVal === true){
      this.machine.status = "Unavailable";
      this.toggleOffline.emit(this.machine);
      console.log(this.machine.status);
    } else {
      console.log(this.machine.status)
      this.toggleOffline.emit(this.machine);
    }
  }
}
