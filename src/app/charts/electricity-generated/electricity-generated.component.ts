import { Component, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-electricity-generated',
  templateUrl: './electricity-generated.component.html',
  styleUrls: ['./electricity-generated.component.scss']
})
export class ElectricityGeneratedComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "發電量",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "預測發電量",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2024-08-07T00:00:00.000Z",
          "2024-08-07T01:30:00.000Z",
          "2024-08-07T02:30:00.000Z",
          "2024-08-07T03:30:00.000Z",
          "2024-08-07T04:30:00.000Z",
          "2024-08-07T05:30:00.000Z",
          "2024-08-07T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "yy/MM/dd HH:mm"
        }
      }
    };
  }

  public generateData(baseval: number, count: number, yrange: { min: number; max: number }): any[] {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

}
