import React, { useRef, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSelectedBike } from '../../state/modules/bike';
import { getCombinedGearList, getGearListForBike } from '../../state/modules/gear';
import { XYPlot, VerticalBarSeries } from 'react-vis';
import { Card, CardBody, CardTitle } from '../shared';

const GearChart = ({ forSelectedBike = false }) => {
  const { id = 0, name = '' } = useSelector(getSelectedBike) || {};
  const [width, setWidth] = useState(600);
  const bodyRef = useRef(null);
  const hasBikeSelection = forSelectedBike && id;
  const gearList =
    useSelector(
      state => forSelectedBike ? getGearListForBike(state, id) : getCombinedGearList
    );

  useLayoutEffect(() => {
    if (bodyRef.current) {
      setWidth(bodyRef.current.offsetWidth - 100);
    }
  }, [bodyRef.current, gearList]);

  if (forSelectedBike && !hasBikeSelection) {
    return <></>
  }


  return (
    <Card>
      <CardBody ref={bodyRef}>
        <CardTitle>{ hasBikeSelection ? name + "'s Components Usage" : 'Components Usage'}</CardTitle>
        <XYPlot
          height={300} width={width}
          stackBy="y"
          xDomain={[
            0,
            8
          ]}
          yDomain={[
            0,
            50
          ]}
        >
          <VerticalBarSeries
            cluster="stack 1"
            data={[
              {
                x: 0,
                y: 25
              },
              {
                x: 1,
                y: 18.519853401701763
              },
              {
                x: 2,
                y: 18.624192157448437
              },
              {
                x: 3,
                y: 20.069756980102497
              },
              {
                x: 4,
                y: 18.993709174737482
              },
              {
                x: 5,
                y: 17.382287650696053
              },
              {
                x: 6,
                y: 16.373664766566248
              },
              {
                x: 7,
                y: 17.1510940688748565
              },
              {
                x: 8,
                y: 16.465132108813786
              }
            ]}
            style={{}}
          />
          <VerticalBarSeries
            cluster="stack 1"
            data={[
              {
                x: 0,
                y: 20
              },
              {
                x: 1,
                y: 19.08476505593583
              },
              {
                x: 2,
                y: 20.65727480419114
              },
              {
                x: 3,
                y: 19.48944986791977
              },
              {
                x: 4,
                y: 18.740029167078823
              },
              {
                x: 5,
                y: 19.920017032239432
              },
              {
                x: 6,
                y: 19.08165875287935
              },
              {
                x: 7,
                y: 20.614055800667831
              },
              {
                x: 8,
                y: 19.050473535136524
              }
            ]}
            style={{}}
          />
        </XYPlot>
      </CardBody>
    </Card>

  )
};

export default GearChart;
