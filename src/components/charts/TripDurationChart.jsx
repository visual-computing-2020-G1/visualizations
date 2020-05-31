import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  Interval,
  Util,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Basic extends React.Component {
  render() {
    const data = [
      {
        country: "中国",
        population: 131744,
      },
      {
        country: "印度",
        population: 104970,
      },
      {
        country: "美国",
        population: 29034,
      },
      {
        country: "印尼",
        population: 23489,
      },
      {
        country: "巴西",
        population: 18203,
      },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(this.props.data);
    dv.transform({
      type: "map",
      callback(row) {
        // 加工数据后返回新的一行，默认返回行数据本身
        row.tripSourceTarget = parseFloat(
          (row.startToEndDuration / (row.startToEnd * 60)).toFixed(2)
        );
        return row;
      },
    });
    dv.transform({
      type: "map",
      callback(row) {
        row.tripTargetSource = parseFloat(
          (row.endToStartDuration / (row.endToStart * 60)).toFixed(2)
        );
        return row;
      },
    });
    dv.transform({
      type: "fold",
      fields: ["tripSourceTarget", "tripTargetSource"],
      key: "key",
      value: "value",
      retains: ["endName"],
    });
    dv.transform({
      type: "sort",
      callback(a, b) {
        return (
          a.tripSourceTarget +
          a.tripTargetSource -
          b.tripTargetSource -
          b.tripSourceTarget
        );
      },
    });
    return (
      <React.Fragment>
        {this.props.data.length > 0 && (
          <Chart height={300    } data={dv.rows} forceFit>
            {/* <Coordinate transpose /> */}
            <Tooltip shared/>
            <Interval position="endName*value" color="key" />
          </Chart>
        )}
      </React.Fragment>
    );
  }
}

export default Basic;
