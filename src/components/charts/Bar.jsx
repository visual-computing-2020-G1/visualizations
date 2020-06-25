import React from "react";

import { Card } from "antd";

import { Chart, Geom, Axis, Legend, Interval } from "bizcharts";

const scale = {};
const colors = [
  "#6395F9",
  "#62DAAB",
  "#657798",
  "#F6C022",
  "#E96C5B",
  "#74CBED",
  "#9967BD",
];
const Bar = ({ data, day, setNumberDay }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    setMounted(true);
  }, [data]);

  return (
    <Card size="small" title={`cantidad de recorridos por día-${day}`}>
      {mounted && (
        <Chart
          data={data}
          scale={scale}
          height={237}
          padding={30}
          forceFit
          onClick={(e) => {
            //console.log(e)
            if (e.data !== undefined && e.data !== null && e.data.data.day !== undefined) {
              setNumberDay(parseInt(e.data.data.day));
            }
          }}
        >
          {/* <Axis name="value" /> */}
          <Axis name="day" />
          <Geom
            element-highlight
            type="interval"
            position="day*value"
            color={[
              "type",
              (type) => {
                return colors[type];
              },
            ]}
            label={["value", (val) => "val"]}
            tooltip={[
              "day*value*type",
              (day, value, type) => {
                // array
                const dayName =
                  type === 0
                    ? "L"
                    : type === 1
                    ? "M"
                    : type === 2
                    ? "W"
                    : type === 3
                    ? "J"
                    : type === 4
                    ? "V"
                    : type === 5
                    ? "S"
                    : "D";
                return {
                  //   title="day-value-name",
                  name: "día del mes, recorrido, dia de la semana ",
                  value: day + "-" + value + "-" + dayName,
                };
              },
            ]}
          >
            <Legend position="right" />
          </Geom>
        </Chart>
      )}
    </Card>
  );
};
export default Bar;
