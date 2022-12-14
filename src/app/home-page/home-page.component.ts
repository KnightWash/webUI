import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService, IMqttServiceOptions } from 'ngx-mqtt';


export type Machine = {
  name: string;
  status: string;
  notifsOn: boolean;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public machines: Machine[] = [];
  public washers: Machine[] = [];
  public dryers: Machine[] = [];
  public notifs: boolean[] = [];

  private subscription: Subscription;
  topicname: any;
  msg: IMqttMessage;
  isConnected: boolean = false;
  @ViewChild('msglog', { static: true }) msglog: ElementRef;

  constructor(private _mqttService: MqttService) {
    this.subscription = this._mqttService.observe('calvin/#').subscribe((message: IMqttMessage) => {
      this.msg = message;
      this.onMessage();
    });
    console.log("got past constructing")
  }

  onChange(newMachine: Machine) {
    console.log("got to home onChange")
    const newSearch = this.machines.find(machine => machine.name === newMachine.name)
    // if the new machine exists,
    if (newMachine.name?.indexOf("/washer") > -1 && newSearch) {
      console.log("changing notif values for a washer!");
      console.log("Originally " + this.washers[this.washers.indexOf(newSearch)].notifsOn);
      console.log("Now " + newMachine.notifsOn);
      this.washers[this.washers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
    } else if (newMachine.name?.indexOf("/dryer") > -1 && newSearch) {
      console.log("changing notif values for a dryer!");
      this.dryers[this.dryers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  public onMessage(): void {
    const newMachine: Machine =  {
      name: this.msg.topic,
      status: this.msg.payload.toString(),
      notifsOn: false
    }

    // search the current machine list for the new machine
    const newSearch = this.machines.find(machine => machine.name === newMachine.name)
    // if the new machine exists,
    if (newMachine.name?.indexOf("/washer") > -1 && newSearch) {
      console.log("Existing washer found!");
      newMachine.notifsOn = this.washers[this.washers.indexOf(newSearch)].notifsOn;
      newMachine.notifsOn = this.machines[this.machines.indexOf(newSearch)].notifsOn;
      console.log(newMachine.notifsOn);
      this.washers[this.washers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
    } else if (newMachine.name?.indexOf("/dryer") > -1 && newSearch) {
      console.log("Existing dryer found!");
      newMachine.notifsOn = this.dryers[this.dryers.indexOf(newSearch)].notifsOn;
      newMachine.notifsOn = this.machines[this.machines.indexOf(newSearch)].notifsOn;
      console.log(newMachine.notifsOn);
      this.dryers[this.dryers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
    } else {
      console.log("New machine found!");
      this.machines.push(newMachine);
      newMachine.name?.indexOf("/washer") > -1 ? this.washers.push(newMachine) : this.dryers.push(newMachine);
      console.log(this.machines);
    }
  }


  public subscribeNewTopic(): void {
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe("/calvin/#").subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log('msg: ', message);
    });
  }
}
