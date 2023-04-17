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
    this.subscription = this._mqttService.observe('calvin/knightwash/analytics/#').subscribe((message: IMqttMessage) => {
      this.msg = message;
      this.onMessage();
    });
  }

  @ViewChildren(BaseChartDirective) chart: BaseChartDirective | undefined;
  public data = [10,3,3,4,5,0,30,55,20,0,0,0,0,0,0,0,45,56];
  public times = [ '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
  public power = [];
  public buildings = ['Bolt', 'Heyns', 'Timmer'];
  public mqttJson: any;

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
      {
        label: "# of Users",
        data: this.data,
        borderColor: 'rgb(255,225,58)',
        backgroundColor: 'rgb(255,225,58)'
      }
    ]
  };

  //building energy chartData
  public energyData: ChartData<'bar'> = {
    labels: this.buildings,
    datasets: [
      {
        label: "power usage",
        data: this.power,
        borderColor: 'rgb(255,225,58)',
        backgroundColor: 'rgb(255,225,58)'
      }
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
    this.subscription.unsubscribe();
  }
  public onMessage(): void {
    //log message here
    console.log("message received");
    console.log(this.msg.payload.toString());
    //push data to data array
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
