import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService, IMqttServiceOptions } from 'ngx-mqtt';

export type Machine = {
  name: string;
  status: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
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
  ngOnInit(): void { }

  ngOnDestroy(): void {
    // unsubscribe from all topics
    this.subscription.unsubscribe();
  }
  // When a message is received
  public onMessage(): void {
    // create a new machine out of the message
    const newMachine: Machine = {
      name: this.msg.topic,
      status: this.msg.payload.toString(),
    }

    // search the current machine list for the new machine
    const newSearch = this.machines.find(machine => machine.name === newMachine.name)
    // if the new machine exists, and is a washer,
    if (newMachine.name?.indexOf("/washer") > -1 && newSearch) {
      // update the notification switch state of the incoming machine to match that of the existing one
      //console.log("Existing washer found!");
      // Update the current machine to match the new machine from the message
      this.washers[this.washers.indexOf(newSearch)] = newMachine;
      this.machines[this.machines.indexOf(newSearch)] = newMachine;
      // same for the dryers
    } else if (newMachine.name?.indexOf("/dryer") > -1 && newSearch) {
      //console.log("Existing dryer found!");
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