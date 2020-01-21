import React from 'react';
import GearTable from './gearsTable';
import GearChart from './gearChart';

const Gears = () => {
  return (
    <>
      <GearTable />
      <GearChart />
    </>
  )
};

export { default as GearTable } from './gearsTable';
export { default as GearChart } from './gearChart';
export default Gears;
