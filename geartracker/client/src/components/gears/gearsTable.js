import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, CardSubtitle, CardTitle, CardBody, IconButton, StyledButton, TableInput } from '../shared';
import { getSelectedBike } from '../../state/modules/bike';
import {
  getGearListForBike,
  getCombinedGearList,
  updateGear,
  discardChanges,
  getPendingGears, editGear, selectGear, getSelectedGearId
} from '../../state/modules/gear';

const BikeComponents = ({ forSelectedBike = false }) => {
  const dispatch = useDispatch();
  const { id = 0, name = '' } = useSelector(getSelectedBike) || {};
  const selectedGear = useSelector(getSelectedGearId);
  const hasBikeSelection = forSelectedBike && id;
  const editGearList = useSelector(getPendingGears);
  const setCB = (id, field) => val => dispatch(editGear(id, field, val));
  const gearList =
    useSelector(
      state => forSelectedBike ? getGearListForBike(state, id) : getCombinedGearList(state)
    );

  return (
    <Card>
      <CardBody>
        <CardTitle>{ hasBikeSelection ? name + "'s Components" : 'Components'}</CardTitle>
        <CardSubtitle>{ forSelectedBike && !id ? 'Select bike to make manage components' : 'Showing all components'}</CardSubtitle>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Distance</th>
            <th>Elevation</th>
          </tr>
          </thead>
          <tbody>
          {
            gearList
              .map((gear, index) => (
                <tr
                  key={gear.id}
                  onClick={() => dispatch(selectGear(gear.id))}
                  className={selectedGear === gear.id ? 'selected' : ''}
                >
                  <th scope="row">{index + 1}</th>
                  <TableInput val={gear.name} cb={setCB(gear.id, 'name')}/>
                  <td>{gear.type}</td>
                  <TableInput val={gear.brand} cb={setCB(gear.id, 'brand')}/>
                  <TableInput val={gear.model} cb={setCB(gear.id, 'model')}/>
                  <td>{gear.distance}</td>
                  <td>{gear.elevation}</td>
                </tr>
                )
              )
          }
          </tbody>
          {!!(!forSelectedBike || hasBikeSelection) &&
            <tfoot>
              <tr>
                <td>
                  <IconButton onClick={() => dispatch(updateGear(null, id))}>
                    <FontAwesomeIcon icon="plus"/>
                  </IconButton>
                </td>
                {
                  Object.keys(editGearList).length > 0 && (
                    <td colSpan={2}>
                      <StyledButton width="auto" style={{'marginRight': 5}}>
                        <FontAwesomeIcon icon="check" /> Save
                      </StyledButton>
                      <StyledButton
                        onClick={() => dispatch(discardChanges())}
                        width="auto" style={{'marginRight': -5}}
                      >
                        <FontAwesomeIcon icon="times" /> Discard
                      </StyledButton>
                    </td>
                  )
                }
              </tr>
            </tfoot>
          }
        </Table>
      </CardBody>
    </Card>
  )
};

export default BikeComponents;

