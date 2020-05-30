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
    function formatArray(data, currentStation) {
      let newData = [];
      data.forEach((obj) => {
        const objCp = { ...obj };
        delete objCp.coord;
        obj.startName === currentStation
          ? newData.push(objCp)
          : newData.push({
              startName: obj.endName,
              endName: obj.startName,
              endToStart: obj.startToEnd,
              startToEnd: obj.endToStart,
            });
      });
      console.log("newData", newData);
      return newData;
    }
    console.log(this.props.data)
    const dv = ds
      .createView()
      .source(formatArray(this.props.data, this.props.currentStation));
    //   .source(formatArray(this.props.data, this.props.currentStation));
    console.log("currents..." , formatArray(this.props.data, this.props.currentStation));

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
    console.log(dv);
    const dt = this.props.data;
    return (
      <div>
        {dt.length > 0 && (
          <Chart height={600} data={dv.rows} autoFit>
            <Coordinate transpose />
            <Axis
              name="endName"
              label={{
                offset: 12,
              }}
            />
            <Interval
              adjust={[{ type: "stack" }]}
              position="endName*valor"
              color={"key"}
            />
          </Chart>
        )}
      </div>
    );
  }
}
export default Stacked;
