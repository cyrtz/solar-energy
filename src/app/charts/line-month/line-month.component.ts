import { Component, OnInit, ViewChild } from "@angular/core";

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
  ApexLegend
} from "ng-apexcharts";

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
};

@Component({
  selector: 'app-line-month',
  templateUrl: './line-month.component.html',
  styleUrls: ['./line-month.component.scss']
})
export class LineMonthComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  categories:string[] = [];
  
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Series 1",
          // 每天更新一次月總發電量
          data: [1.1, 2.1, 4.3, 5.4, 6.2, 7.3, 8.6, 10.0, 11.0]
        }
      ],
      chart: {
        height: 200,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#545454"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      // 未顯示
      title: {
        text: "月結算",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: this.categories,
        title: {
          text: "date"
        }
      },
      yaxis: {
        title: {
          text: "Temperature"
        },
        min: 5,
        max: 40
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  ngOnInit(): void {
    this.generateCategories();
  }
  // 生成日期
  generateCategories() {
    for (let monthIndex = 0; monthIndex < this.months.length; monthIndex++) {
      const year = new Date().getFullYear();
      const month = monthIndex + 1;
      const daysInMonth = new Date(year, month, 0).getDate();
      // 根據月份生成日期
      for (let day = 1; day <= daysInMonth; day++) {
        this.categories.push(`${this.months[monthIndex]} ${day}`);
      }
    }
  }
}

