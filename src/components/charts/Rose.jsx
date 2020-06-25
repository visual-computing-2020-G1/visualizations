import React from "react";
import { Card } from "antd";

import { Chart, Interval, Tooltip, Axis, Coordinate } from "bizcharts";

const Rose = ({ data, filter }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  },[data]);

  return (
    <Card title="Promedio por día de la semana" size="small">
      {mounted && (
        <Chart
          height={400}
          data={data}
          forceFit
          onClick={(e) => filter(e)}
          // onMouseDown={e => //console.log(e)}
        >
          <Coordinate type="polar" />
          <Axis visible={true} />
          <Tooltip showTitle={false} />
          <Interval
            position="name*value"
            adjust="stack"
            element-highlight
            color="name"
            style={{
              lineWidth: 1,
              stroke: "#fff",
            }}
            label={[
              "name",
              {
                offset: -15,
              },
            ]}
          />
        </Chart>
      )}
    </Card>
  );
};
export default Rose;
