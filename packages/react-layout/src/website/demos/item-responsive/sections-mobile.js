import { Field } from '@cofi/react-form';

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const column = (fieldIds) => ({
  style: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
  },
  boxes: fieldIds.map(id => ({ component: Field, props: { id } })),
});

export default [{
  id: 'personal-information',
  title: 'Personal Information',
  boxes: [{
    style: rowStyle,
    boxes: [
      column(['firstName', 'lastName', 'personalId', 'address']),
    ],
  }],
}, {
  id: 'job-information',
  title: 'Job Information',
  boxes: [{
    style: rowStyle,
    boxes: [
      column(['department', 'benefits', 'level']),
    ],
  }],
}];
