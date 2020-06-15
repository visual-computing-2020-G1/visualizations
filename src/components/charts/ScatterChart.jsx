import React, { useState, useEffect } from "react";
import { Chart, Point, Tooltip } from "bizcharts";
import DataSet from "@antv/data-set";
import { Typography, Badge, Divider } from "antd";

function scatterFormat(data) {
  let newDataSourceTarget = [];
  let newDataTargetSource = [];
  console.log("scatter format:", data);
  data.forEach((record) => {
    newDataSourceTarget.push({
      target: ` ${record.startName}->${record.endName}`,
      ammount: record.startToEnd,
      time: parseFloat(
        (record.startToEndDuration / (record.startToEnd * 60)).toFixed(2)
      ),
      type: "S.T.",
    });
    newDataSourceTarget.push({
      target: ` ${record.endName}->${record.startName}`,
      ammount: record.endToStart,
      time: parseFloat(
        (record.endToStartDuration / (record.endToStart * 60)).toFixed(2)
      ),
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
          <Tooltip title="Tiempo de recorrido">
            {(title, items, target) => {
              console.log("items", items);
              console.log("title", title);
              console.log("target", target);
              // items 是个数组，即被触发tooltip的数据。
              // 获取items的颜色
              const color = items[0].color;
              return (
                <div style={{ minWidth: 200 }}>
                  <div style={{ style: 20 }}>
                    <Typography.Text strong>{title}</Typography.Text>
                    <br />
                    <Divider />
                    <Badge color={items[0].color} /> {items[0].data.target}:{" "}
                    {items[0].value} <br />
                    <Badge color={items[0].color} /> viajes:{" "}
                    {items[0].data.ammount} <br />
                  </div>
                </div>
              );
            }}
          </Tooltip>
        </Chart>
      )}
    </React.Fragment>
  );
}
export default Scatter;
