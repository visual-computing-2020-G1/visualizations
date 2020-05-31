export function getAmmountByDay(data) {
  //All .json
  let dictDay = {};
  let results = [];
  data.forEach((record) => {
    const time = new Date(record.starttime);
    const day = time.getDate();
    if (dictDay[day] === undefined) {
      const typeDay = time.getDay();
      dictDay[day] = { value: 1, type: typeDay };
    } else {
      dictDay[day] = { ...dictDay[day], value: dictDay[day].value + 1 };
    }
  });
  for (let nameObj in dictDay) {
    results.push({
      day: nameObj,
      value: dictDay[nameObj].value,
      type: dictDay[nameObj].type,
    });
  }
  return results;
}

export function avergayByDayOfWeek(data) {
  /**
   * data = [{value:100, day: 1, type:10}]
   */
  let totals = {};
  let result = [];
  data.forEach((element) => {
    if (totals[element.type] === undefined) {
      totals[element.type] = { count: 1, total: element.value };
    } else {
      totals[element.type] = {
        count: totals[element.type].count + 1,
        total: totals[element.type].total + element.value,
      };
    }
  });
  for (let nameObj in totals) {
    const nameDay =
      nameObj === "0"
        ? "L"
        : nameObj === "1"
        ? "M"
        : nameObj === "2"
        ? "W"
        : nameObj === "3"
        ? "J"
        : nameObj === "4"
        ? "V"
        : nameObj === "5"
        ? "S"
        : "D";
    result.push({
      name: nameDay,
      value: totals[nameObj].total / totals[nameObj].count,
      number: nameObj,
    });
  }
  return result;
}
export function getPlaces(data) {
  /*
  @data: array of all data
  */
  let places = {};
  let lines = [];
  let dictEdges = {};

  //for all places
  data.forEach((record) => {
    const place = record["start station name"];
    if (places[place] === undefined) {
      const coord = {
        lat: record["start station latitude"],
        long: record["start station longitude"],
      };
      places[place] = { coord: { ...coord }, input: 1, output: 0 };
    } else {
      places[place] = { ...places[place], input: places[place].input + 1 };
    }
  });
  data.forEach((record) => {
    const place = record["end station name"];
    if (places[place] === undefined) {
      const coord = {
        lat: record["end station latitude"],
        long: record["end station longitude"],
      };
      places[place] = { coord: { ...coord }, output: 1, input: 0 };
    } else {
      places[place] = { ...places[place], output: places[place].output + 1 };
    }
  });

  data.forEach((record) => {
    //pairvalues count
    const nameStart = record["start station name"];
    const nameEnd = record["end station name"];
    const tripduration = parseInt(record["tripduration"]);
    const startCoord = {
      lat: record["start station latitude"],
      long: record["start station longitude"],
    };
    const endCoord = {
      lat: record["end station latitude"],
      long: record["end station longitude"],
    };
    const name0 = `${nameStart}|${nameEnd}`;
    if (dictEdges[name0] === undefined) {
      dictEdges[name0] = {
        value: 1,
        startCoord: startCoord,
        endCoord: endCoord,
        tripduration: tripduration,
      };
    } else {
      dictEdges[name0] = {
        ...dictEdges[name0],
        value: dictEdges[name0].value + 1,
        tripduration: dictEdges[name0].tripduration + tripduration,
      };
    }
  });
  // console.log("dictEdges", dictEdges);
  // data.forEach( record =>{
  //   const nameStart = record["start station name"];
  //   const nameEnd = record["end station name"];
  //   const name0 = `${nameStart}|${nameEnd}`;
  //   const tripduration = parseInt(record["tripduration"])
  //   const totalTripDuration = dictEdges[`${nameStart}|${nameEnd}`].tripduration
  //   const N =dictEdges[`${nameStart}|${nameEnd}`].value
  //   const media =  totalTripDuration/N
  //   if(Math.abs(media - tripduration) > 1500){
  //     places[nameStart].input = places[nameStart].input  -1
  //     places[nameEnd].output = places[nameEnd].output  -1
  //     dictEdges[name0].value = dictEdges[name0].value -1
  //     dictEdges[name0].tripduration  = dictEdges[name0].tripduration - tripduration
  //   }
  // })

  let edges = [];
  for (let nameObj in dictEdges) {
    const names = nameObj.split("|");
    const startCoord = dictEdges[`${names[0]}|${names[1]}`].startCoord;
    const endCoord = dictEdges[`${names[0]}|${names[1]}`].endCoord;
    const startValue = dictEdges[`${names[0]}|${names[1]}`].value;
    const startDuration = dictEdges[`${names[0]}|${names[1]}`].tripduration;
    const endValue =
      dictEdges[`${names[1]}|${names[0]}`] === undefined
        ? 0
        : dictEdges[`${names[1]}|${names[0]}`].value;
    const endDuration =
      dictEdges[`${names[1]}|${names[0]}`] === undefined
        ? 0
        : dictEdges[`${names[1]}|${names[0]}`].tripduration;
    edges.push({
      coord: [
        [startCoord.long, startCoord.lat],
        [endCoord.long, endCoord.lat],
      ],
      startName: names[0],
      endName: names[1],
      startToEnd: startValue,
      endToStart: endValue,
      startToEndDuration: startDuration,
      endToStartDuration: endDuration,
    });
  }
  // console.log("edges", edges);
  let placeArray = [];
  let i = 0;
  for (let namePlace in places) {
    const lat = places[namePlace].coord.lat;
    const long = places[namePlace].coord.long;
    const input = places[namePlace].input;
    const output = places[namePlace].output;
    placeArray.push({
      name: namePlace,
      key: i,
      centroid: [long * 1, lat * 1],
      input: input,
      output: output,
    });
    i++;
  }
  return { placeArray, edges };
}

export function formatArray(data, currentStation) {
  //sort by currentstation
  let newData = [];
  data.forEach((obj) => {
    const objCp = { ...obj };
    delete objCp.coord;
    obj.startName === currentStation
      ? newData.push(objCp)
      : newData.push({
          startName: obj.endName,
          endName: obj.startName,
          endToStart: obj.startToEnd,
          endToStartDuration: obj.startToEndDuration,
          startToEnd: obj.endToStart,
          startToEndDuration: obj.endToStartDuration,
        });
  });
  // console.log("newData", newData);
  return newData;
}

export function filterByDay(data, chooseDay) {
  let filterData = [];
  data.forEach((record) => {
    const time = new Date(record.starttime);
    const day = time.getDate();
    if (chooseDay === true || parseInt(day) === parseInt(chooseDay)) {
      filterData.push(record);
    }
  });
  return filterData;
}
export function countByAge(data, startStation = true, endStation = true) {
  let dictAge = {};
  let arrayAge = [];
  const currentYear = new Date().getFullYear()
  data.forEach((record) => {
    const nameStart = record["start station name"];
    const nameEnd = record["end station name"];
    const year = currentYear - parseInt(record["birth year"]);
    if (
      dictAge[year] === undefined &&
      (startStation || nameStart === startStation) &&
      (endStation || nameEnd === endStation)
    ) {
      dictAge[year] = 1;
    } else {
      dictAge[year] = 1 + dictAge[year];
    }
  });
  for (let nameObj in dictAge) {
    arrayAge.push({
      year: nameObj,
      value: dictAge[nameObj],
    });
  }
  return arrayAge;
}
export function countGender(data) {
  let male = 0;
  data.forEach((record) => {
    if (record.gender === "1") male++;
  });
  return { male: male, female: data.length - male };
}
// export { getAmmountByDay, avergayByDayOfWeek };
