function getAmmountByDay(data) {
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

function avergayByDayOfWeek(data) {
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
export { getAmmountByDay, avergayByDayOfWeek };
