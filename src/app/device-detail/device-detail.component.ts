import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import { dataSeries } from '../models/data-series';


// import { IDataRecord } from './data-series';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  fill: ApexFill;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

interface IDataRecord {
  date: Date;
  value: number;
}

function generateFakeData(numRecords: number): IDataRecord[] {
  const fakeData: IDataRecord[] = [];

  for (let i = 0; i < numRecords; i++) {
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - i); // Generate dates in reverse order

    const randomValue = Math.random() * 100; // Generate random numbers between 0 and 100

    fakeData.push({ date: randomDate, value: randomValue });
  }
  // console.log(fakeData);

  return fakeData;
}

// const fakeDataSeries: IDataRecord[] = generateFakeData(100);
// console.log(fakeDataSeries);

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})



export class DeviceDetailComponent {
  // @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  
  constructor() {
    // const dates: IDataRecord[] = generateFakeData(100);
    // const dates = [];
    // for (let i = 0; i < fakeDataSeries.length; i++) {
    //   dates.push([fakeDataSeries[i].date, fakeDataSeries[i].value]);
    // }
    // console.log(dates.map(record => [record]));
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }

    this.chartOptions = {
      series: [
        {
          name: "My-series",
          // data: dates.map(record => [record.date, record.value])
          data: dates
          // data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: "碳排量歷史紀錄折線圖"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: any) {
            return (val).toFixed(2);
          }
        },
        title: {
          text: "碳排量 (克)"
        },
      },
      xaxis: {
        type: "datetime",
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val: any) {
            return (val).toFixed(2);
          }
        }
      }
    };
  }
}
