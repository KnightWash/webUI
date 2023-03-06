import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService, IMqttServiceOptions } from 'ngx-mqtt';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent {
  constructor(private _mqttService: MqttService) {
    //Subscribe to analytics topic
    this.subscription = this._mqttService.observe('calvin/analytics/#').subscribe((message: IMqttMessage) => {
      this.msg = message;
      this.onMessage();
    });
  }

  @ViewChildren(BaseChartDirective) chart: BaseChartDirective | undefined;
  public data = [10,3,3,4,5,0,30,55,20,0,0,0,0,0,0,0,45,56];
  public times = [ '12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
  public power = [];
  public buildings = ['beta', 'gamma', 'bolt'];

  //setup for barcharts
  //got structure from https://valor-software.com/ng2-charts/#BarChart
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  //select what type of chart is being created
  public chartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  //busy time chart data
  public timeData: ChartData<'bar'> = {
    labels: this.times,
    datasets: [
      { data: this.data }
    ]
  };

  //building energy chartData
  public energyData: ChartData<'bar'> = {
    labels: this.buildings,
    datasets: [
      { data: this.power }
    ]
  };

  //values for mqtt subscription
  private subscription: Subscription;
  topicname: any;
  msg: IMqttMessage;
  isConnected: boolean = false;
  @ViewChild('msglog', {static: true }) msglog: ElementRef;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //unsubscribe from all topic
    this.
    subscription.unsubscribe();
  }
  public onMessage(): void {
    //log message here
    console.log('log message here');
    //push data to data array
    //call function to make graph
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
