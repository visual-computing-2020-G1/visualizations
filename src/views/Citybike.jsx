import React from "react";
import { Row, Col, Card } from "antd";
import { avergayByDayOfWeek, getAmmountByDay, getPlaces } from "../utils";
import BarChart from "../components/charts/Bar";
import HorizontalBar from "../components/charts/HorizontalBar";
import Rose from "../components/charts/Rose";
import data from "../data/citybike/bike_2020_03-.json";
import Map from "../components/charts/map/Map";
import MapBox from "../components/charts/map/MapBox";
import DataSet from "@antv/data-set";

const ds = new DataSet();
const Citibike = () => {
  /*
    @ammountsByDay:  Cantidad de viajes por día
    @ammountsByDay:  Promedio de viajes dependiendo del día L-M-W-J-V-S-D
    @CurrentDay:     Día actual, funciona para filtrar los días en el grafico de barras
    @dataMap:        Variable que contiene todos los lugares y los lados que posteriormente se ponen en el mapa
    @edgesFilter:        Variable que contiene los lados una vez se le da click al respectivo nodo (lugar)
  */
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
  const [dataMap, setDataMap] = React.useState(getPlaces(data));
  const [edgesFilter, setEdgesFilter] = React.useState([]);
  const [currentStation, setCurrentStation] = React.useState([]);

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
  // console.log(getPlaces(data))
  return (
    <div>
      <ul>
        <li>
          Para resetear el grafico de barras se debe dar click en un espacio en
          blanco en el grafico de promedio por día de la semana.
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
      <Row gutter={[10, 10]}>
        <Col span="14">
          <Card bodyStyle={{ minHeight: 600 }}>
            <Map
              places={dataMap.placeArray}
              lines={dataMap.edges}
              edgeFilterProp={setEdgesFilter}
              setCurrentStation={setCurrentStation}
            />
          </Card>
        </Col>
        <Col span="10">
          <Card
            bodyStyle={{ minHeight: 300 }}
            size="small"
            title="Lugares más visitados desde el lugar de origen"
          >
            <HorizontalBar data={edgesFilter} currentStation={currentStation} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span="16">
          <Card bodyStyle={{ minHeight: 600 }}>{/* <MapBox  /> */}</Card>
        </Col>
      </Row>
    </div>
  );
};
export default Citibike;
