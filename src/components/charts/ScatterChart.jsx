import React, { useState, useEffect } from "react";
import { Chart, Point } from "bizcharts";
import DataSet from "@antv/data-set";

function scatterFormat(data) {
  let newDataSourceTarget = [];
  let newDataTargetSource = [];
  data.forEach((record) => {
    newDataSourceTarget.push({
      ammount: record.startToEnd,
      time: parseFloat((record.startToEndDuration / 60).toFixed(2)),
      type: "S.T.",
    });
    newDataSourceTarget.push({
      ammount: record.endToStart,
      time: parseFloat((record.endToStartDuration / 60).toFixed(2)),
      type: "T.S.",
    });
  });

  return { st: newDataSourceTarget, ts: newDataTargetSource };
}
function Scatter({ dataProp }) {
  console.log("dataprop", dataProp);
  const newData = scatterFormat(dataProp);
  console.log(newData);
  return (
    <React.Fragment>
      {newData.st.length > 0 && (
        <Chart
          height={300}
          data={newData.st}
          autoFit
          interactions={["legend-highlight"]}
        >
          <Point
            position="ammount*time"
            color="type"
            shape="circle"
            fill={{
              fillOpacity: 0.85,
            }}
          />
        </Chart>
      )}
    </React.Fragment>
  );
}
export default Scatter;
