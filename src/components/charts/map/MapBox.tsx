import {
  LayerEvent,
  LineLayer,
  MapboxScene,
  Marker,
  PointLayer,
  PolygonLayer,
  Popup,
} from '@antv/l7-react';
import * as React from 'react';
import ReactDOM from 'react-dom';

const dataFlyTest = [
  {
    coord: [
      [-74.0337589, 40.7272235],
      [-74.21105069962759, 4.285993532528952],
    ],
  },
  {
    coord: [
      [-60.0337589, 50.7272235],
      [-74.21105069962759, 4.285993532528952],
    ],
  },
  {
    coord: [
      [-98.585522, 39.8333333],
      [-74.21105069962759, 4.285993532528952],
    ],
  },
  {
    coord: [
      [-3.80271911621095,40.3633918762208],
      [-74.21105069962759, 4.285993532528952],
    ],
  },
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

function joinData(geodata: any, ncovData: any) {
  const ncovDataObj: any = {};
  ncovData.forEach((item: any) => {
    const {
      countryName,
      countryEnglishName,
      currentConfirmedCount,
      confirmedCount,
      suspectedCount,
      curedCount,
      deadCount,
    } = item;
    if (countryName === '中国') {
      if (!ncovDataObj[countryName]) {
        ncovDataObj[countryName] = {
          countryName: 0,
          countryEnglishName,
          currentConfirmedCount: 0,
          confirmedCount: 0,
          suspectedCount: 0,
          curedCount: 0,
          deadCount: 0,
        };
      } else {
        ncovDataObj[countryName].currentConfirmedCount += currentConfirmedCount;
        ncovDataObj[countryName].confirmedCount += confirmedCount;
        ncovDataObj[countryName].suspectedCount += suspectedCount;
        ncovDataObj[countryName].curedCount += curedCount;
        ncovDataObj[countryName].deadCount += deadCount;
      }
    } else {
      ncovDataObj[countryName] = {
        countryName,
        countryEnglishName,
        currentConfirmedCount,
        confirmedCount,
        suspectedCount,
        curedCount,
        deadCount,
      };
    }
  });
  const geoObj: any = {};
  geodata.features.forEach((feature: any) => {
    const { name } = feature.properties;
    geoObj[name] = feature.properties;
    const ncov = ncovDataObj[name] || {};
    feature.properties = {
      ...feature.properties,
      ...ncov,
    };
  });
  return geodata;
}

const World = React.memo(function Map() {
  const [data, setData] = React.useState();
  const [filldata, setfillData] = React.useState();
  const [popupInfo, setPopupInfo] = React.useState<{
    lnglat: number[];
    feature: any;
  }>();
  React.useEffect(() => {
    const fetchData = async () => {
      const [geoData, ncovData] = await Promise.all([
        fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/e62a2f3b-ea99-4c98-9314-01d7c886263d.json',
        ).then((d) => d.json()),
        // https://lab.isaaclin.cn/nCoV/api/area?latest=1
        fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/55a7dd2e-3fb4-4442-8899-900bb03ee67a.json',
        ).then((d) => d.json()),
      ]);
      const worldData = joinData(geoData, ncovData.results);
      const pointdata = worldData.features.map((feature: any) => {
        return feature.properties;
      });
      setfillData(worldData);
      setData(pointdata);
    };
    fetchData();
  }, []);
  function showPopup(args: any): void {
    setPopupInfo({
      lnglat: args.lngLat,
      feature: args.feature,
    });
  }

  return (
    <>
      <MapboxScene
        map={{
          center: [110.19382669582967, 50.258134],
          pitch: 0,
          style: 'blank',
          zoom: 1,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {popupInfo && (
          <Popup lnglat={popupInfo.lnglat}>
            {popupInfo.feature.name}
            <ul
              style={{
                margin: 0,
              }}
            >
              <li>现有确诊:{popupInfo.feature.currentConfirmedCount}</li>
              <li>累计确诊:{popupInfo.feature.confirmedCount}</li>
              <li>治愈:{popupInfo.feature.curedCount}</li>
              <li>死亡:{popupInfo.feature.deadCount}</li>
            </ul>
          </Popup>
        )}
        {data && [
          <PolygonLayer
            key={'1'}
            options={{
              autoFit: false,
            }}
            source={{
              data: filldata,
            }}
            scale={{
              values: {
                confirmedCount: {
                  type: 'quantile',
                },
              },
            }}
            color={{
              values: '#ddd',
            }}
            shape={{
              values: 'fill',
            }}
            style={{
              opacity: 1,
            }}
          />,
          <LineLayer
            key={'3'}
            source={{
              data: filldata,
            }}
            size={{
              values: 0.6,
            }}
            color={{
              values: '#fff',
            }}
            shape={{
              values: 'line',
            }}
            style={{
              opacity: 1,
            }}
          />,
          <LineLayer
          key={"0"}
          source={{
            data: dataFlyTest,
            
            parser: {
              type: "json",
              coordinates: "coord",
              // key: "key",
            },
          }}
          size={{
            values: 2,
          }}
          color={{
            field: "startToEnd*endToStart",
            values: (start, end) => {
                return "#AD2310";
            },
  
            // values: "#8C1EB2",
          }}
          shape={{
            values: "arc3d",
          }}
          active={{ option: true }}
          style={{
            opacity: 1,
          }}
          // animate={{
          //   enable: false,
          //   interval: 1,
          //   trailLength: 1.5,
          //   duration: 2,
          //   speed: 3
          // }}
          animate={{
            enable: true,
            trailLength: 1.2,
            interval: 0.5,
            duration: 7,
          }}
        >
        </LineLayer>
  


          // <PointLayer
          //   key={'2'}
          //   options={{
          //     autoFit: true,
          //   }}
          //   source={{
          //     data,
          //     parser: {
          //       type: 'json',
          //       coordinates: 'centroid',
          //     },
          //   }}
          //   scale={{
          //     values: {
          //       confirmedCount: {
          //         type: 'log',
          //       },
          //     },
          //   }}
          //   color={{
          //     values: '#b10026',
          //   }}
          //   shape={{
          //     values: 'circle',
          //   }}
          //   active={{
          //     option: {
          //       color: '#0c2c84',
          //     },
          //   }}
          //   size={{
          //     field: 'confirmedCount',
          //     values: [5, 60],
          //   }}
          //   animate={{
          //     enable: true,
          //   }}
          //   style={{
          //     opacity: 0.6,
          //   }}
          // >
          //   <LayerEvent type="mousemove" handler={showPopup} />
          // </PointLayer>,
        ]}
      </MapboxScene>
    </>
  );
});
export default World
// ReactDOM.render(<World />, document.getElementById('map'));