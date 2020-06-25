import React from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts';
function IntervalTime({data}) {
  return <Chart height={300} autoFit data={data} interactions={['active-region']} padding={[30, 30, 50, 50]} >
    <Interval position="time*value" />
    <Tooltip shared />
  </Chart>
}
export default IntervalTime