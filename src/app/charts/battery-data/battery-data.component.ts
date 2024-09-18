import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexTooltip
} from 'ng-apexcharts';
import { DeviceDetailService } from 'src/app/service/device-detail/device-detail.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-battery-data',
  templateUrl: './battery-data.component.html',
  styleUrls: ['./battery-data.component.scss']
})
export class BatteryDataComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() deviceMacAddress: string = '';

  batteryData: any[] = [];
  batteryDataV: number[] = [];
  batteryDataA: number[] = [];
  batteryDataW: number[] = [];
  time: string[] = [];

  ngOnInit(): void {
    console.log(this.deviceMacAddress);
    this.getBattInfoList();
  }

  constructor(
    private deviceDetailService: DeviceDetailService,
  ) {
    this.chartOptions = {
      series: [
        {
          name: '電壓(V)',
          data: this.batteryDataV.reverse(),
        },
        {
          name: '電流(A)',
          data: this.batteryDataA.reverse(),
        },
        {
          name: '功率(W)',
          data: this.batteryDataW.reverse(),
        }
      ],
      chart: {
        height: 360,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454', '#FCCB5E'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: '今日狀態',
        align: 'center'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: this.time.reverse(),
        type: 'datetime',
        tickAmount: 6,
        labels: {
          formatter: function (val: any) {
            let date = new Date(val);
            return date.toTimeString().split(' ')[0];
          }
        },
        title: {
          text: '時間'
        }
      },
      yaxis: {
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -10,
        offsetX: -5
      }
    }
  }

  getBattInfoList() {
    this.deviceDetailService.getSunDetailData(this.deviceMacAddress, "2024-09-03").subscribe(res => {
      this.batteryData = res.data;
      this.batteryData.forEach(element => {
        this.batteryDataV.push(element.dataV);
        this.batteryDataA.push(element.dataA);
        this.batteryDataW.push(element.dataW);
        this.time.push(element.createTime);
      });
    });
  }
}
