import * as React from "react";
import '@progress/kendo-theme-default/dist/all.css';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle, ChartLegend } from "@progress/kendo-react-charts";

const categories = ['21/01/2024', '22/01/2024', '23/01/2024'];
const series = [{
  name: "Project A",
  data: [3.907, 7.943, 7.848]
}, {
  name: "Project B",
  data: [4.743, 7.295, 7.175]
}, {
  name: "Project C",
  data: [0.21, 0.375, 1.161]
}, {
  name: "Project D",
  data: [1.988, 2.733, 3.994]
}];
const areaData = [{
  name: "Overtime Hours",
  data: [2.088, 3.152]
}, {
  name: "",
  data: []
}, {
  name: "Worked Hours",
  data: [1.743, 1.95, 1.175]
},];

// eslint-disable-next-line 
const pieData = [{
  name: "India",
  share: 0.24
}, {
  name: "Russian Federation",
  share: 0.26,
  explode: true
}, {
  name: "Germany",
  share: 0.1
}, {
  name: "World",
  share: 0.4
}];

const ChartContainer = () => <>
  <div className="row mb-3">
    <div className="col-6">
      <div className="k-card m-1">
        <Chart style={{
          height: 350
        }} className="m-4">
          <ChartTitle text="Column Chart" />
          <ChartLegend position="top" orientation="horizontal" />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categories} startAngle={45} />
          </ChartCategoryAxis>
          <ChartSeries>
            {series.map((item, idx) => <ChartSeriesItem key={idx} type="column" tooltip={{
              visible: true
            }} data={item.data} name={item.name} />)}
          </ChartSeries>
        </Chart>
      </div>
    </div>
    <div className="col-6">
      <div className="k-card m-1">
        <Chart style={{
          height: 350
        }} className="m-4 ">
          <ChartTitle text="Line Chart" />
          <ChartLegend position="top" orientation="horizontal" />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categories} startAngle={45} />
          </ChartCategoryAxis>
          <ChartSeries>
            {areaData.map((item, idx) => <ChartSeriesItem key={idx} type="line" tooltip={{
              visible: true
            }} data={item.data} name={item.name} />)}
          </ChartSeries>
        </Chart>
      </div>
    </div>
  </div>

</>;
export default ChartContainer;