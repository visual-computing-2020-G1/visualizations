import React from "react";
import { Row, Col } from "antd";
import BarChart from "../components/charts/Bar";
import Rose from "../components/charts/Rose";
import { avergayByDayOfWeek, getAmmountByDay } from "../utils";
import data from "../data/citybike/bike_2020_03-.json";
import DataSet from "@antv/data-set";

const ds = new DataSet();
const Citibike = () => {
  const [ammountsByDay, setAmmount] = React.useState(
    ds.createView().source(getAmmountByDay(data))
  );
  const [average, setAverage] = React.useState(
    avergayByDayOfWeek(getAmmountByDay(data))
  );
  const [currentDay, setCurrentDay] = React.useState("All");

  function resetBar() {
    setAmmount(ds.createView().source(getAmmountByDay(data)));
  }

  function filterAmmout(e) {
    if (e.data === null || e.data === undefined) {
      resetBar();
      setCurrentDay("All");
    } else {
      if (e.data.data !== undefined) {
        const dv = ds.createView().source(getAmmountByDay(data));
        dv.transform({
          type: "filter",
          callback(row) {
            return row.type === parseInt(e.data.data.number);
          },
        });
        setAmmount(dv);
        setCurrentDay(e.data.data.name);
      }
    }
  }
  return (
    <div>
      <ul>
        <li>
          Para resetear el grafico de barras se debe dar click en un espacio en blanco en el grafico de promedio por día de la semana.
        </li>
      </ul>
      <Row gutter={[15, 15]}>
        <Col span="12">
          <Rose data={average} filter={filterAmmout} />
        </Col>
        <Col span="12">
          <BarChart key="barchar" data={ammountsByDay.rows} day={currentDay} />
        </Col>
      </Row>
    </div>
  );
};
export default Citibike;
