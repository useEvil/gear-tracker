import React from 'react';
import BikesTable from './bikesTable'
import { GearTable, GearChart } from '../gears';

const Bikes = () => {
  return (
    <>
      <BikesTable />
      <GearTable forSelectedBike />
      <GearChart forSelectedBike />
    </>
  )
};

export { default as BikesTable } from './bikesTable'
export default Bikes;
