import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService, IMqttServiceOptions } from 'ngx-mqtt';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import Chart from 'chart.js/auto'
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

  public boltData : any[]=[];
  public boltTimes: any[]=[];
  public heynsData : any[]=[];
  public heynsTimes: any[]=[];
  public timmerData : any[]=[];
  public timmerTimes: any[]=[];
  public mqttJson: any;
  public topic: string;
  public testx: any[] = [];
  public testy: any[] = [];
  public test: Chart;
  public timeDataBolt: Chart;
  public timeDataHeyns: Chart;
  public timeDataTimmer: Chart;

  //values for mqtt subscription
  private subscription: Subscription;
  topicname: any;
  msg: IMqttMessage;
  isConnected: boolean = false;
  @ViewChild('msglog', {static: true }) msglog: ElementRef;

  ngOnInit(): void {
    //initalize Bolt Chart
    this.timeDataBolt = new Chart('timeDataBolt', {
      type: 'bar',
      data: {
        labels: this.boltTimes,
        datasets: [{
          label: '# of Users',
          data: this.boltData,
          backgroundColor: 'rgb(255,225,58)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero:true
          }
        }
      }
    });
    //initalize Heyns Chart
    this.timeDataHeyns = new Chart('timeDataHeyns', {
      type: 'bar',
      data: {
        labels: this.heynsTimes,
        datasets: [{
          label: '# of Users',
          data: this.heynsData,
          backgroundColor: 'rgb(255,225,58)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero:true
          }
        }
      }
    });
    //initalize Timmer Chart
    this.timeDataTimmer = new Chart('timeDataTimmer', {
      type: 'bar',
      data: {
        labels: this.heynsTimes,
        datasets: [{
          label: '# of Users',
          data: this.heynsData,
          backgroundColor: 'rgb(255,225,58)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero:true
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    //unsubscribe from all topic
    this.subscription.unsubscribe();
  }
  public onMessage(): void {
    //log message here
    //console.log(this.msg.topic.substr(this.msg.topic.lastIndexOf('/')));
    //getting the topic name to determine which graph to update
    this.topic = this.msg.topic.substr(this.msg.topic.lastIndexOf('/'));
    // console.log("Test x data: ", this.testx)
    // console.log("Test y data: ", this.testy)

    if(this.topic === "/bolt"){
      this.resetGraph(this.timeDataBolt, this.boltData, this.boltTimes);
      //receive and parse json from mqtt message
      this.mqttJson = this.msg.payload.toString();
      //console.log(this.msg.payload.toString());
      let jsonObject = JSON.parse(this.mqttJson)

      //push the new data to array for graphs
      for(const data of jsonObject) {
        if (data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'hour') && Object.prototype.hasOwnProperty.call(data, 'count')) {
          //console.log(data.hour);
          this.boltTimes.push(data.hour);
          this.boltData.push(data.count);
        }
      }
      //console.log("bolt data:", this.boltData)
      this.updateGraph(this.timeDataBolt, this.boltData, this.boltTimes)
    }
    if(this.topic === "/heyns"){
      this.resetGraph(this.timeDataHeyns, this.heynsData, this.heynsTimes);
      //receive and parse json from mqtt message
      this.mqttJson = this.msg.payload.toString();
      //console.log(this.msg.payload.toString());
      let jsonObject = JSON.parse(this.mqttJson)

    //push the new data to array for graphs
      for(const data of jsonObject) {
        if (data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'hour') && Object.prototype.hasOwnProperty.call(data, 'count')) {
          //console.log(data.hour);
          this.heynsTimes.push(data.hour);
          this.heynsData.push(data.count);
        }
      }
      //console.log("bolt data:", this.boltData)
      this.updateGraph(this.timeDataHeyns, this.heynsData, this.heynsTimes)
    }
    if(this.topic === "/timmer"){
      this.resetGraph(this.timeDataTimmer, this.timmerData, this.timmerTimes);
      //receive and parse json from mqtt message
      this.mqttJson = this.msg.payload.toString();
      //console.log(this.msg.payload.toString());
      let jsonObject = JSON.parse(this.mqttJson)

      //push the new data to array for graphs
      for(const data of jsonObject) {
        if (data && typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'hour') && Object.prototype.hasOwnProperty.call(data, 'count')) {
          //console.log(data.hour);
          this.timmerTimes.push(data.hour);
          this.timmerData.push(data.count);
        }
      }
      //console.log("bolt data:", this.boltData)
      this.updateGraph(this.timeDataTimmer, this.timmerData, this.timmerTimes)
    }
    //push data to data array
  }

  //reset the arrays for the charts and the graph so it starts fresh every week
  public resetGraph(Chart:Chart, data: any[], labels: any[] ){
    data.length = 0;
    labels.length = 0;
    //console.log("reset graph: ", data)
    //console.log("reset graph: ", labels)
    Chart.data.datasets[0].data = data;
    Chart.data.labels = labels;
    Chart.update();
  }

  //update the graph based on json data coming from mqtt message
  public updateGraph(Chart:Chart, data: any[], labels: any[] ){
    Chart.data.datasets[0].data = data;
    Chart.data.labels = labels;
    Chart.update();
  }
}
