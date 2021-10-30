import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { clone, cloneDeep } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { createForm, FormContext, Field } from '../../../../../../../lib';
import employeeForm from './form';


const Employee = ({ onSave, onCancel }) => {
  const { model } = useContext(FormContext);

  const save = useCallback(() => onSave(model.data), [onSave, model.data]);

  return (<div>
    <h3>New Employee</h3>
    <Field id="firstName" />
    <Field id="lastName" />
    <Button disabled={!model.dirty || model.invalid
      || model.processing} onClick={save}
    aria-label="Save" color="primary" variant="contained">Save</Button>
    <Button onClick={onCancel}>Cancel</Button>
  </div>);
};

const getEmployeeForm = () => {
  const form = cloneDeep(employeeForm); // formDefinition is shared also for example code usage
  return createForm(form)(Employee);
};

const EmployeeForm = getEmployeeForm();

export const RemoveButton = styled.span`
  cursor: pointer;
  font-size: 11px;
  color: #0095ff;
  position: relative;
  top: 0px;
  margin-left: 5px;
`;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const EmployeeModal = ({ value = [], state, onStateChange, onValueChange, classes }) => {

  const close = useCallback(() => onStateChange({ ...state, isModalOpen: false }), [onStateChange, state]);

  const open = useCallback(() => onStateChange({ ...state, isModalOpen: true }), [onStateChange, state]);

  const add = useCallback((employee) => {
    const newValue = clone(value);
    newValue.push(employee);
    onValueChange(newValue);
    close();
  }, [onValueChange, value, close]);

  const remove = useCallback((index) => {
    const newValue = clone(value);
    newValue.splice(index, 1);
    onValueChange(newValue);
  }, [onValueChange, value]);

  return (<div>
    <ul>
      {
        value.map((employee, index) => (<li key={index}>
          {index + 1}. {employee.firstName} <RemoveButton onClick={() => { remove(index); }}>X</RemoveButton>
        </li>))
      }
    </ul>
    <Button color="primary" onClick={open}>Add New</Button>
    <Modal open={state.isModalOpen === true} onClose={close}>
      <div style={getModalStyle()} className={classes.paper}>
        <EmployeeForm onSave={add} onCancel={close} />
      </div>
    </Modal>
  </div>);
};

EmployeeModal.propTypes = {
  value: PropTypes.array.isRequired,
  state: PropTypes.object,
  onValueChange: PropTypes.func.isRequired,
  onStateChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(EmployeeModal);
