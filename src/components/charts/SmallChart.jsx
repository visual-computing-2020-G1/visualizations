import React from "react";
import ReactDOM from "react-dom";
import { Chart, Interval } from "bizcharts";

// 数据源
// const data = [
//   { genre: 'Sports', sold: 275 },
//   { genre: 'Strategy', sold: 155 },
//   { genre: 'Action', sold: 230 },
//   { genre: 'Shooter', sold: 250 },
//   { genre: 'Other', sold: 450 }
// ];

function Demo({ data }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    setMounted(true);
  }, [data]);
  return (
    <React.Fragment>
      {mounted && (
        <Chart data={data} autoFit height={100}>
          <Interval position="year*value" />
        </Chart>
      )}
    </React.Fragment>
  );
}
export default Demo;
