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
  newSwitchVal: boolean;

  ngOnInit() {
    console.log("offline switch: " + this.machine.offlineOn);
    console.log("old newSwitchVal: " + this.newSwitchVal);
    this.newSwitchVal = this.machine.offlineOn;
    console.log("new newSwitchVal: " + this.newSwitchVal);
    this.changeState();
  }

  onChange($event: MatSlideToggleChange) {
    this.changeState();
  }

  changeState(){
    console.log("value of switch: " + this.newSwitchVal)
    if(this.newSwitchVal === true){
      console.log("inside true if statement");
      this.machine.status = "Unavailable";
      console.log("changed state to unavaliable")
      this.machine.offlineOn = this.newSwitchVal;
      console.log("state of toggle: " + this.machine.offlineOn);
      this.toggleOffline.emit(this.machine);
    }
    if (this.newSwitchVal === false && this.machine.status === "Unavailable"){
      console.log("inside false if");
      this.machine.offlineOn = this.newSwitchVal;
      this.toggleOffline.emit(this.machine);
      console.log("wait for next message");
    }
  }
}
