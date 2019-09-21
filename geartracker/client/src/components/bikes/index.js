import React from 'react';
import BikesTable from './bikesTable'
import { GearTable } from '../gears';

const Bikes = () => {
  return (
    <>
      <BikesTable />
      <GearTable forSelectedBike />
    </>
  )
};

export { default as BikesTable } from './bikesTable'
export default Bikes;
