import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Card, CardSubtitle, CardTitle, CardBody, IconButton, StyledButton, TableInput } from '../shared';
import { getBikeDropdownList, getSelectedBike } from '../../state/modules/bike';
import {
  getGearListForBike, getCombinedGearList, updateGear,
  discardChanges, getPendingGears, editGear, selectGear,
  getSelectedGearId, getGearTypes, submitGearEdits, getDeletedGears, deleteGear,
} from '../../state/modules/gear';
import TableSelect from '../shared/select';
import { isLoading } from '../../state/modules/session';
import { THEME } from '../../styles';

const BikeComponents = ({ forSelectedBike = false }) => {
  const dispatch = useDispatch();
  const { id = 0, name = '' } = useSelector(getSelectedBike) || {};
  const gearList =
    useSelector(
      state => forSelectedBike ? getGearListForBike(state, id) : getCombinedGearList(state)
    );
  const editGearList = useSelector(getPendingGears);
  const selectedGearId = useSelector(getSelectedGearId);
  const deletedGears = useSelector(getDeletedGears);
  const hasBikeSelection = forSelectedBike && id;
  const gearTypes = useSelector(getGearTypes);
  const sessionLoading = useSelector(isLoading);
  const bikeDropDown = useSelector(getBikeDropdownList);

  const setCB = (id, field) => val => dispatch(editGear(id, field, val));
  const handleSave = () => dispatch(submitGearEdits());

  return (
    <Card>
      <CardBody>
        <CardTitle>{ hasBikeSelection ? name + "'s Components" : 'Components'}</CardTitle>
        <CardSubtitle>
          {forSelectedBike && !id ?
            'Select bike to make manage components' :
            'Showing all components'}
        </CardSubtitle>
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
            {!forSelectedBike ? <th>Bike</th> : null}
            <th> </th>
          </tr>
          </thead>
          <tbody>
          {gearList
            .map((gear, index) => (
              <tr
                key={gear.id}
                onClick={() => { if (gear.id !== selectedGearId) dispatch(selectGear(gear.id))}}
                className={selectedGearId === gear.id ? 'selected' : ''}
              >
                <th scope="row">{index + 1}</th>
                <TableInput val={gear.name} cb={setCB(gear.id, 'name')}/>
                <TableSelect val={gear.type} options={gearTypes} cb={setCB(gear.id, 'type')}/>
                <TableInput val={gear.brand} cb={setCB(gear.id, 'brand')}/>
                <TableInput val={gear.model} cb={setCB(gear.id, 'model')}/>
                <td>{gear.distance}</td>
                <td>{gear.elevation}</td>
                {
                  !forSelectedBike ?
                    <TableSelect val={gear.bike} options={bikeDropDown} cb={setCB(gear.id, 'bike')}/> :
                    null
                }
                <td>
                  <IconButton disabled={sessionLoading} onClick={() => dispatch(deleteGear(gear.id))}>
                    <FontAwesomeIcon icon={deletedGears[gear.id] ? 'undo' : 'trash-alt'} color={THEME.colors.red}/>
                  </IconButton>
                </td>
              </tr>
              )
            )}
          </tbody>
          {!!(!forSelectedBike || hasBikeSelection) &&
            <tfoot>
              <tr>
                <td>
                  <IconButton disabled={sessionLoading} onClick={() => dispatch(updateGear(null, id))}>
                    <FontAwesomeIcon icon="plus" />
                  </IconButton>
                </td>
                {(!!Object.keys(editGearList).length || !!Object.keys(deletedGears).length) && (
                  <td colSpan={2}>
                    <StyledButton
                      disabled={sessionLoading}
                      width="auto"
                      style={{'marginRight': 5}}
                      onClick={handleSave}
                    >
                      <FontAwesomeIcon icon="check" /> Save
                    </StyledButton>
                    <StyledButton
                      disabled={sessionLoading}
                      onClick={() => dispatch(discardChanges())}
                      width="auto" style={{'marginRight': -5}}
                    >
                      <FontAwesomeIcon icon="times" /> Discard
                    </StyledButton>
                  </td>
                  )}
              </tr>
            </tfoot>
          }
        </Table>
      </CardBody>
    </Card>
  )
};

export default BikeComponents;

