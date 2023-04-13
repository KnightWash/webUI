// Brian Langejans: TheBguy87
// Kurt Wietelmann: kwietelmann
// 12/10/2022
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService, IMqttServiceOptions } from 'ngx-mqtt';

export type Machine = {
  name: string;
  status: string;
  timestamp: number;
  notifsOn: boolean;
  offlineOn: boolean;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  // list for all machines, and then one for each type of machine
  public machines: Machine[] = [];
  public washers: Machine[] = [];
  public dryers: Machine[] = [];

  // values for mqtt subscription
  // MQTT help from https://medium.com/@anant.lalchandani/dead-simple-mqtt-example-over-websockets-in-angular-b9fd5ff17b8e
  private subscription: Subscription;
  topicname: any;
  msg: IMqttMessage;
  isConnected: boolean = false;
  @ViewChild('msglog', { static: true }) msglog: ElementRef;

  constructor(private _mqttService: MqttService) {
    // Subscribe to all mqtt calvin topics and receive messages from them
    this.subscription = this._mqttService.observe('calvin/#').subscribe((message: IMqttMessage) => {
      this.msg = message;
      this.onMessage();
    });
  }

  // For when the notification switch changes
  onChange(newMachine: Machine) {
    const newSearch = this.machines.find(machine => machine.name === newMachine.name)
    // if the machine passed here already exists and is a washer,
    if (newMachine.name?.indexOf("/washer") > -1 && newSearch) {
      // update the existing washer's notification switch value
      this.washers[this.washers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
    } else if (newMachine.name?.indexOf("/dryer") > -1 && newSearch) {
      // same for dryers
      this.dryers[this.dryers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    // unsubscribe from all topics
    this.subscription.unsubscribe();
  }

  // When a message is received
  public onMessage(): void {
    // create a new machine out of the message
    const newMachine: Machine =  {
      name: this.msg.topic,
      status: this.msg.payload.toString().split('|')[0],
      timestamp: Number(this.msg.payload.toString().split('|')[1]),
      notifsOn: false,
      offlineOn: false
    }
    let now: Date =  new Date();
    // number on the right is in seconds (e.g. 11 minutes is 660)
    if (now.getTime()/1000 - newMachine.timestamp >= 660 ) {
      // newMachine.status = "Unavailable";
      // newMachine.status = Number(now.getTime()/1000 - (newMachine.timestamp)).toString();
      newMachine.status = `$(Number(600)).toString()`;
    }

    // debugging for calculating time since last post
    // if (!Number.isNaN(newMachine.timestamp)) { // filter out non-timestamped posts, like our tester bash script
    //   console.log("====")
    //   console.log("Now " + now.getTime()/1000)
    //   console.log("Timestamp " + newMachine.timestamp)
    //   console.log("Final: " + (now.getTime()/1000 - newMachine.timestamp))
    // }

    // search the current machine list for the new machine
    const newSearch = this.machines.find(machine => machine.name === newMachine.name)
    // if the new machine exists, and is a washer,
    if (newMachine.name?.indexOf("/washer") > -1 && newSearch) {
      // update the notification switch state of the incoming machine to match that of the existing one
      //console.log("Existing washer found!");
      newMachine.notifsOn = this.washers[this.washers.indexOf(newSearch)].notifsOn;
      // Update the current machine to match the new machine from the message
      this.washers[this.washers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
      // same for the dryers
    } else if (newMachine.name?.indexOf("/dryer") > -1 && newSearch) {
      //console.log("Existing dryer found!");
      newMachine.notifsOn = this.dryers[this.dryers.indexOf(newSearch)].notifsOn;
      this.dryers[this.dryers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
    } else {
      // if the machine doesn't exist in the app yet, add it to the relevent lists
      //console.log("New machine found!");
      this.machines.push(newMachine);
      newMachine.name?.indexOf("/washer") > -1 ? this.washers.push(newMachine) : this.dryers.push(newMachine);
    }
  }

  // subscribe to a new mqtt topic
  public subscribeNewTopic(): void {
    this.subscription = this._mqttService.observe("/calvin/#").subscribe((message: IMqttMessage) => {
      this.msg = message;
    });
  }
}
