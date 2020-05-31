import React from "react";
import { Row, Col, Card, Select, Statistic } from "antd";
import {
  avergayByDayOfWeek,
  getAmmountByDay,
  getPlaces,
  formatArray,
  filterByDay,
  countGender,
  countByAge,
} from "../utils";
import data from "../data/citybike/bike_2020_03-.json";

import BarChart from "../components/charts/Bar";
import SmallChart from "../components/charts/SmallChart";
import HorizontalBar from "../components/charts/HorizontalBar";
import Rose from "../components/charts/Rose";
import Scatter from "../components/charts/ScatterChart";
import Map from "../components/charts/map/Map";
import TripDurationChart from "../components/charts/TripDurationChart";
// // import MapBox from "../components/charts/map/MapBox";
import DataSet from "@antv/data-set";

const ds = new DataSet();
const Citibike = () => {
  /*
    @ammountsByDay:  Cantidad de viajes por día
    @ammountsByDay:  Promedio de viajes dependiendo del día L-M-W-J-V-S-D
    @CurrentDay:     Día actual, funciona para filtrar los días en el grafico de barras
    @dataMap:        Variable que contiene todos los lugares y los lados que posteriormente se ponen en el mapa
    @edgesFilter:        Variable que contiene los lados una vez se le da click al respectivo nodo (lugar)
    @NumberDay:        Variable que contiene el numero de dia que filtra los registro del mapa
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
  const [numberDay, setNumberDay] = React.useState(true);
  const [edgesFilter, setEdgesFilter] = React.useState([]);
  const [currentStation, setCurrentStation] = React.useState([]);
  const [searchedStation, setsearchedStation] = React.useState("");
  const [genders, setGenders] = React.useState(countGender(data));
  const [ages, setAges] = React.useState(countByAge(data));

  React.useEffect(() => {
    const newData = filterByDay(data, numberDay);
    // console.log("newdata", newData);
    setGenders(countGender(newData));
    setAges(countByAge(newData));
    setDataMap(getPlaces(newData));
  }, [numberDay]);

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
      <h3>Instrucciones</h3>
      <ul>
        <li>
            Usted puede visualizar el promedio por día  de la semana en la primera grafica, usted puede filtrar el grafico de barras si se le da click dentro del grafico de torta
        </li>
        <li>
          Para restaurar el grafico de barras (cantidad por día) usted debe hacer click en un espacio en blanco en el grafico de promedio por día
        </li>
        <li>
          Se puede filtrar la cantidad de mujeres y hombres por día si se le da click en el grafico de barras de cantidad de recorridos, este también filtrará la cantidad de personas por año
        </li>
        <li>
          Cuando usteed selecciona un día el mapa mostrará solamente la información acerca de ese día
        </li>
        <li>
          Es posible encontrar la estación de bicicletas en el mapa con la barra de busqueda
        </li>
        <li>
          Cada véz que se da click a un nodo (estación) se podrá ver tres graficos, cantidad de usuarios que entran a la estación (starToEnd), cantidad de usuarios que llegan de otras estaciones(EndToStart)
          y el tiempo promedio que se demora de estación a estación
        </li>
        <li>
          Existen algunos datos que tienen el tiempo de viaje muy largo, estos datos pueden provocar que las graficas no se vean correctamente.
        </li>

      <h3>To do</h3>
        <li>
          To do: Filtrar en la grafica  tripduration las estaciones con un checkbox o algún desplegable
        </li>
        <li>
          Cada vez que se seleccione algún nodo del mapa se debe mostrar la cantidad de usuarios por genero que llegaron a la estación desde otras y que tomaron el servicio desde ahí
        
        </li>
        <li>
          Cada vez que se seleccione algún nodo del mapa se debe mostrar la cantidad de usuarios por año que llegaron a la estación desde otras y que tomaron el servicio desde ahí
        
        </li>
      </ul>
      <Row gutter={[15, 15]}>
        <Col span="7">
          <Rose data={average} filter={filterAmmout} />
        </Col>
        <Col span="17">
          <Row gutter={[15, 15]}>
            <Col span="18">
              <BarChart
                key="barchar"
                data={ammountsByDay.rows}
                day={currentDay}
                setNumberDay={setNumberDay}
              />
            </Col>
            <Col span="6">
              <Card style={{ minHeight: 151 }}>
                <Statistic
                  title="Hombres"
                  suffix={` dia: ${numberDay === true ? "todos" : numberDay}`}
                  value={genders.male}
                />
              </Card>
              <Card style={{ minHeight: 151 }}>
                <Statistic
                  title="mujeres"
                  suffix={` dia: ${numberDay === true ? "todos" : numberDay}`}
                  value={genders.female}
                />
              </Card>
            </Col>
          </Row>

          <Card style={{ minHeight: 150 }}>
            <SmallChart data={ages} />
          </Card>
        </Col>
      </Row>
      {dataMap.placeArray && (
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select a station"
          showSearch
          onChange={(e) => setsearchedStation(parseInt(e))}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {Object.keys(dataMap.placeArray).map((key) => (
            <Select.Option key={dataMap.placeArray[key].name} value={key}>
              {dataMap.placeArray[key].name}
            </Select.Option>
          ))}
        </Select>
      )}
      <Row gutter={[10, 10]}>
        <Col span="14">
          <Card bodyStyle={{ minHeight: 300 }}>
            <Map
              places={dataMap.placeArray}
              lines={dataMap.edges}
              edgeFilterProp={setEdgesFilter}
              setCurrentStation={setCurrentStation}
              searchedStation={searchedStation}
            />
          </Card>
          <Card bodyStyle={{ minHeight: 300 }}>
            <TripDurationChart
              data={formatArray(edgesFilter, currentStation)}
            />
          </Card>
        </Col>
        <Col span="10">
          <Card bodyStyle={{ minHeight: 300 }} size="small">
            <HorizontalBar data={formatArray(edgesFilter, currentStation)} />
          </Card>
          <Card>
            <Scatter dataProp={formatArray(edgesFilter, currentStation)} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span="16"></Col>
      </Row>
    </div>
  );
};
export default Citibike;
