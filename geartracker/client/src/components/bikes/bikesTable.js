import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TableInput, IconButton, StyledButton, Card,
  CardSubtitle, CardTitle, CardBody, Table,
} from '../shared';
import {
  getPendingBikes, getSelectedBikeId, getCombinedBikeList,
  discardChanges, editBike, selectBike, updateBike,
} from '../../state/modules/bike';

const BikesTable = () => {
  const dispatch = useDispatch();
  const bikeList = useSelector(getCombinedBikeList);
  const editBikeList = useSelector(getPendingBikes);
  const selectedBikeId = useSelector(getSelectedBikeId);
  const setCB = (id, field) => val => dispatch(editBike(id, field, val));

  return (
    <Card>
      <CardBody>
        <CardTitle>My Bikes</CardTitle>
        <CardSubtitle>Select bike to manage components</CardSubtitle>
        <Table>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Distance</th>
            <th>Elevation</th>
          </tr>
          </thead>
          <tbody>
          {bikeList.map((bike, index) => (
            <tr
              onClick={() => dispatch(selectBike(bike.id))}
              key={bike.id}
              className={selectedBikeId === bike.id ? 'selected' : ''}
            >
              <th scope="row">{index + 1}</th>
              <TableInput val={bike.name} cb={setCB(bike.id, 'name')} />
              <TableInput val={bike.brand} cb={setCB(bike.id, 'brand')} />
              <TableInput val={bike.model} cb={setCB(bike.id, 'model')} />
              <td>{bike.distance}</td>
              <td>{bike.elevation}</td>
            </tr>
            )
          )}
          </tbody>
          <tfoot>
          <tr>
            <td>
              <IconButton onClick={() => dispatch(updateBike())}>
                <FontAwesomeIcon icon="plus"/>
              </IconButton>
            </td>
            {
              !!Object.keys(editBikeList).length && (
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
        </Table>
      </CardBody>
    </Card>
  );
};

export default BikesTable;
