import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Machine } from '../home-page/home-page.component'

@Component({
  selector: 'app-machine-card',
  templateUrl: './machine-card.component.html',
  styleUrls: ['./machine-card.component.scss']
})
export class MachineCardComponent {
  @Input() machine: Machine;

}
