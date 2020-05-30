import {
  AMapScene,
  LineLayer,
  LayerEvent,
  MapboxScene,
  Marker,
  Control,
  PointLayer,
  Popup,
} from "@antv/l7-react";
import * as React from "react";

// const IMarkerOption= {}
const dataFlyTest = [
  // {
  //   coord: [
  //     [-74.0337589, 40.7272235],
  //     [-74.21105069962759, 4.285993532528952],
  //   ],
  // },
  {
    coord: [
      [-74.0337589, 40.7272235],
      [-74.044247311, 40.727595966],
    ],
    size: 3,
    key: 1,
  },
  {
    coord: [
      [-74.06762212514877, 40.7253399253558],
      [-74.0337589, 40.7272235],
    ],
    size: 4,
    key: 2,
  },
];
const MapScene = React.memo(function Map({
  places,
  lines,
  edgeFilterProp,
  setCurrentStation,
}) {
  // console.log(places);
  const [popupInfoLine, setPopupInfoLine] = React.useState();
  const [popupInfo, setPopupInfo] = React.useState();
  const [filterLine, setFilterLine] = React.useState("");
  const [allLines, setAllLines] = React.useState(true);

  React.useEffect(() => {
    setCurrentStation(filterLine);
    edgeFilterProp(
      lines.filter(
        (val) => val.startName === filterLine || val.endName === filterLine
      )
    );
  }, [filterLine]);
  function showPopup(args) {
    console.log(args);
    args.feature &&
      setPopupInfo({
        lnglat: args.lngLat,
        feature: args.feature,
      });
    setAllLines(false);
    setFilterLine(args.feature.name);
  }
  function showPopupLine(args) {
    console.log(args);
    args.feature &&
      setPopupInfoLine({
        lnglat: args.lngLat,
        feature: args.feature,
      });
    // setAllLines(false);
    // setFilterLine(args.feature.name);
  }
  return (
    <MapboxScene
      map={{
        center: [-74.044247311, 40.727595971],
        pitch: 0,
        style: "dark",
        zoom: 13,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Control type="scale" position="topleft" />
      <Control type="zoom" position="topleft" />
      {popupInfo && (
        <Popup lnglat={popupInfo.lnglat}>
          {popupInfo.feature.name}
          <ul
            style={{
              margin: 0,
            }}
          >
            <li>Estación de inicio:{popupInfo.feature.input}</li>
            <li>Estación final :{popupInfo.feature.output}</li>
          </ul>
        </Popup>
      )}
      {popupInfoLine && (
        <Popup lnglat={popupInfoLine.lnglat}>
          {"Trayectos"}
          <ul
            style={{
              margin: 0,
            }}
          >
            <li>
              {`${popupInfoLine.feature.startName}-${popupInfoLine.feature.endName}`}
              :{popupInfoLine.feature.startToEnd}
            </li>
            <li>
              {`${popupInfoLine.feature.endName}-${popupInfoLine.feature.startName}`}
              :{popupInfoLine.feature.endToStart}
            </li>
          </ul>
        </Popup>
      )}
      <LineLayer
        blend="normal"
        key={"2"}
        source={{
          data: lines.filter(
            (val) =>
              val.startName === filterLine ||
              val.endName === filterLine ||
              allLines
          ),
          parser: {
            type: "json",
            coordinates: "coord",
            // key: "key",
          },
        }}
        size={{
          values: 1.2,
        }}
        color={{
          field: "startToEnd*endToStart",
          values: (start, end) => {
            const total = start + end;
            return total > 50
              ? "#914BF2"
              : total >= 40
              ? "#4BB2F2"
              : total >= 30
              ? "#8C0707"
              : total >= 20
              ? "#3C474B"
              : total >= 10
              ? "#162521"
              : "#f5f5f5";
          },

          // values: "#8C1EB2",
        }}
        shape={{
          values: "line",
        }}
        active={{ option: true }}
        style={{
          opacity: 0.5,
        }}
        animate={{
          enable: true,
          trailLength: 1.2,
          interval: 0.5,
          duration: 7,
        }}
      >
        <LayerEvent type="click" handler={(e) => showPopupLine(e)} />
      </LineLayer>
      {/* <PointLayer/> */}
      <PointLayer
        key={"3"}
        options={{
          autoFit: true,
        }}
        source={{
          data: places,
          parser: {
            type: "json",
            coordinates: "centroid",
          },
        }}
        scale={{
          values: {
            confirmedCount: {
              type: "log",
            },
          },
        }}
        color={{
          field: "output",
          values: (val) => {
            return val > 1000
              ? "#AD2310"
              : val > 700
              ? "#FF5F4A"
              : val > 500
              ? "#FA472F"
              : val > 300
              ? "#2FFA97"
              : "#00AD58";
          },
        }}
        shape={{
          // values: "circle"
          values: "hexagon",
          // values: "circle"
        }}
        active={{
          option: {
            color: "#0c2c84",
          },
        }}
        size={{
          field: "input",
          values: [10, 25],
        }}
        animate={{
          enable: false,
        }}
        style={{
          opacity: 0.8,
        }}
      >
        {/* <LayerEvent type="click" handler={e => console.log(e)} /> */}
        <LayerEvent type="click" handler={(e) => showPopup(e)} />
      </PointLayer>

      {/* <LayerEvent type="click" handler={(e) => alert("hey")} /> */}
    </MapboxScene>
  );
});

export default MapScene;