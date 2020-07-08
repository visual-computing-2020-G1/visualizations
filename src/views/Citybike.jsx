import React, {memo} from "react";
import {
  Row,
  Col,
  Card,
  Select,
  Statistic,
  Divider,
  Upload,
  Button,
  message,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  deleteLargeTrips,
  avergayByDayOfWeek,
  getAmmountByDay,
  getPlaces,
  formatArray,
  filterByDay,
  countGender,
  countByAge,
  setIntervalMinutes,
} from "../utils";
// import data from "../data/citybike/bike_2020_03-.json";
// import data from "../data/citybike/bike_2019_30.json";
import data0 from "../data/citybike/bike_2020_03-.json";

import BarChart from "../components/charts/Bar";
import SmallChart from "../components/charts/SmallChart";
import HorizontalBar from "../components/charts/HorizontalBar";
import Rose from "../components/charts/Rose";
import Scatter from "../components/charts/ScatterChart";
import Map from "../components/charts/map/Map";
import TripDurationChart from "../components/charts/TripDurationChart";
import IntervalTime from "../components/charts/IntervalTime";
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
  const [month, setMonth] = React.useState(0);
  const [data, setData] = React.useState([]);

  const [ammountsByDay, setAmmount] = React.useState(
    ds.createView().source(getAmmountByDay(data))
  );

  const [average, setAverage] = React.useState(
    avergayByDayOfWeek(getAmmountByDay(data))
  );
  const [currentDay, setCurrentDay] = React.useState("All");

  function resetBar() {
    setAmmount(ds.createView().source(getAmmountByDay(deleteLargeTrips(data))));
  }
  const [dataMap, setDataMap] = React.useState(
    getPlaces(deleteLargeTrips(data))
  );
  const [numberDay, setNumberDay] = React.useState(true);
  const [edgesFilter, setEdgesFilter] = React.useState([]);
  const [currentStation, setCurrentStation] = React.useState([]);
  const [searchedStation, setsearchedStation] = React.useState("");
  const [genders, setGenders] = React.useState(
    countGender(deleteLargeTrips(data))
  );
  const [ages, setAges] = React.useState(countByAge(deleteLargeTrips(data)));
  const [intervals, setIntervals] = React.useState([]);
  const [binTime, setBinTime] = React.useState(60);
  React.useEffect(() => {
    const newData = filterByDay(data, numberDay);
    // //console.log("newdata", newData);
    setGenders(countGender(newData));
    setAges(countByAge(newData));
    setDataMap(getPlaces(newData));
    setIntervals(setIntervalMinutes(newData, binTime));
  }, [numberDay]);
  React.useEffect(() => {
    if (month === 0) setData(deleteLargeTrips(data0));
    if (month === 1) setData(deleteLargeTrips(data0));
    if (month === 2) setData(deleteLargeTrips(data0));
  }, [month]);
  React.useEffect(() => {
    // const new Data =
    setAverage(avergayByDayOfWeek(getAmmountByDay(data)));
    setAmmount(ds.createView().source(getAmmountByDay(data)));
    setGenders(countGender(data));
    setDataMap(getPlaces(data));
    setAges(countByAge(data));
    setIntervals(setIntervalMinutes(data, binTime));
    // //console.log("large strip", deleteLargeTrips(data))
    // //console.log(deleteLargeTrips(data), data.length)
  }, [data]);
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
  // //console.log(getPlaces(data))
  return (
    <div>
      <h3>Instrucciones</h3>
      <ul>
        <li>
          Usted puede visualizar el promedio por día de la semana en la primera
          grafica, usted puede filtrar el grafico de barras si se le da click
          dentro del grafico de torta
        </li>
        <li>
          Para restaurar el grafico de barras (cantidad por día) usted debe
          hacer click en un espacio en blanco en el grafico de promedio por día
        </li>
        <li>
          Se puede filtrar la cantidad de mujeres y hombres por día si se le da
          click en el grafico de barras de cantidad de recorridos, este también
          filtrará la cantidad de personas por año
        </li>
        <li>
          Cuando usteed selecciona un día el mapa mostrará solamente la
          información acerca de ese día
        </li>
        <li>
          Es posible encontrar la estación de bicicletas en el mapa con la barra
          de busqueda
        </li>
        <li>
          Cada véz que se da click a un nodo (estación) se podrá ver tres
          graficos, cantidad de usuarios que entran a la estación (starToEnd),
          cantidad de usuarios que llegan de otras estaciones(EndToStart) y el
          tiempo promedio que se demora de estación a estación
        </li>
        <li>
          Existen algunos datos que tienen el tiempo de viaje muy largo, estos
          datos pueden provocar que las graficas no se vean correctamente.
        </li>

        <li>
          Se puede subir datos de otras fechas siempre y cuando el archivo tenga
          el formato correspondiente y tenga extensión json
        </li>
        {/* <h3>To do</h3>
        <li>
          To do: Filtrar en la grafica tripduration las estaciones con un
          checkbox o algún desplegable
        </li>
        <li>
          Cada vez que se seleccione algún nodo del mapa se debe mostrar la
          cantidad de usuarios por genero que llegaron a la estación desde otras
          y que tomaron el servicio desde ahí
        </li>
        <li>
          Cada vez que se seleccione algún nodo del mapa se debe mostrar la
          cantidad de usuarios por año que llegaron a la estación desde otras y
          que tomaron el servicio desde ahí
        </li> */}
      </ul>
      <Row>
        <Col span={12}>
          <Select
            style={{ width: "300px" }}
            defaultValue={0}
            onChange={(e) => setMonth(e)}
          >
            <Select.Option key={0} value={0}>
              2020-03
            </Select.Option>
            <Select.Option key={1} value={1}>
              2020-03
            </Select.Option>
            <Select.Option key={2} value={2}>
              2020-03
            </Select.Option>
          </Select>
        </Col>
        <Col span={12}>
          <Upload
            accept=".json"
            showUploadList={true}
            beforeUpload={(file) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                //console.log("before upload", JSON.parse(e.target.result));
                const dataFile = JSON.parse(e.target.result);

                message.success("Se han cargado los datos exitosamente");
                setData(deleteLargeTrips(dataFile));
              };
              reader.readAsText(file);

              // Prevent upload
              return false;
            }}
          >
            <Button icon={<UploadOutlined />} shape="round">
              Subir datos (formato .json)
            </Button>
          </Upload>
        </Col>
      </Row>
      <Divider type="vertical" />
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
              <Card style={{ maxHeight: 96 }}>
                <Statistic
                  title="Hombres"
                  suffix={` dia: ${numberDay === true ? "todos" : numberDay}`}
                  value={genders.male}
                />
              </Card>
              <Card style={{ maxHeight: 96 }}>
                <Statistic
                  title="Mujeres"
                  suffix={` dia: ${numberDay === true ? "todos" : numberDay}`}
                  value={genders.female}
                />
              </Card>
              <Card style={{ maxHeight: 96 }}>
                <Statistic
                  title="Indefinido"
                  suffix={` dia: ${numberDay === true ? "todos" : numberDay}`}
                  value={genders.undefined}
                />
              </Card>
            </Col>
          </Row>
            
          <Card style={{ minHeight: 150 }} title="viajes por edad" size="small">
            <SmallChart data={ages} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[15, 15]}>
        <Col span={24}>
        <InputNumber
              min={1}
              max={60 * 3}
              onChange={(e) => e > 0 && e < 240 && setBinTime(e)}
              defaultValue={60}
              style={{width:300}}
            />
            <Button block type="primary" onClick={
              e=>{
                const newData = filterByDay(data, numberDay);
                setIntervals(setIntervalMinutes(newData, binTime));
              }
            }>Actualizar</Button>
          <Card size="small" title={`Cantidad de viajes cada ${binTime} minutos` } bordered>
            {intervals.length > 0 && <IntervalTime data={intervals} />}
          </Card>
        </Col>
      </Row>
      {dataMap.placeArray && (
        <Select
          allowClear
          style={{ width: "300%" }}
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
      <Row gutter={[30, 30]}>
        <Col span="24">
          <Card bodyStyle={{ minHeight: 300 }}>
            <Map
              places={dataMap.placeArray}
              lines={dataMap.edges}
              edgeFilterProp={setEdgesFilter}
              setCurrentStation={setCurrentStation}
              searchedStation={searchedStation}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[30, 30]}>
        <Col span={24}>
          <Card
            title={`Duración de viaje promedio de ${currentStation} y otras estaciones`}
            bodyStyle={{ minHeight: 300 }}
          >
            <TripDurationChart
              data={formatArray(edgesFilter, currentStation)}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title={`Duración de viaje vs cantidad de viajes`}
            bodyStyle={{ minHeight: 300 }}
          >
            <Scatter dataProp={formatArray(edgesFilter, currentStation)} />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Cantidad de recorridos" bodyStyle={{ minHeight: 300 }}>
            <HorizontalBar data={formatArray(edgesFilter, currentStation)} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default memo(Citibike, (prev, next)=>{
  console.log(prev,next)
  return prev.binTime === next.binTime
});
