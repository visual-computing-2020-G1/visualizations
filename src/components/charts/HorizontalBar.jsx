import React from "react";
import {
  Chart,
  Interval,
  Axis,
  Tooltip,
  Coordinate,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from "bizcharts";
import DataSet from "@antv/data-set";
const exampleData = [
  {
    endName: "Monmouth and 6th",
    endToStart: 2,
    startName: "Newport Pkwy",
    startToEnd: 2,
  },
  {
    endName: "Riverview Park",
    endToStart: 21,
    startName: "Heights Elevator",
    startToEnd: 21,
  },
  {
    endName: "Newport Pkwy",
    endToStart: 9,
    startName: "Heights Elevator",
    startToEnd: 9,
  },
];
class Stacked extends React.Component {
  render() {
    const ds = new DataSet();
  
    const dv = ds
      .createView()
      .source(this.props.data);
    //   .source(formatArray(this.props.data, this.props.currentStation));
    dv.transform({
      type: "sort",
      callback(a, b) {
        return (a.startToEnd + a.endToStart - b.endToStart - b.startToEnd) ;
      },
    });
    dv.transform({
      type: "fold",
      fields: ["startToEnd", "endToStart"],
      key: "key",
      value: "valor",
      retains: ["endName"],
    });
    //console.log(dv);
    const dt = this.props.data;
    return (
      <div>
        {dt.length > 0 && (
          <Chart height={300} data={dv.rows} autoFit >
             <Tooltip shared />
            <Coordinate transpose />
            <Axis
              name="endName"
              label={{
                offset: 12,
              }}
            />
            <Interval
            //   adjust={[{ type: "stack" }]}
              position="endName*valor"
              color={"key"}
              adjust={[
                {
                  type: "dodge",
                  marginRatio: 1 / 32
                }
              ]}
  
            />
          </Chart>
        )}
      </div>
    );
  }
}
export default Stacked;
