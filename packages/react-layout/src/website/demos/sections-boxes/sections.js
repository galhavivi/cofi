import { Field } from '@cofi/react-form';

const column = (fieldIds) => ({
  style: `
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 400px;
    margin: 0 30px 0 0;
  `,
  boxes: fieldIds.map(id => ({ component: Field, props: { id } })),
});

const row = (columns) => ({
  style: {
    display: 'flex',
    flexDirection: 'row',
  },
  boxes: columns.map(fieldIds => column(fieldIds)),
});

export default [{
  id: 'personal-information',
  title: 'Personal Information',
  boxes: [row([
    ['firstName', 'lastName'],
    ['personalId', 'address'],
  ])],
}, {
  id: 'job-information',
  title: 'Job Information',
  boxes: [row([
    ['department', 'benefits'],
    ['level'],
  ])],
}, {
  id: 'raw-data',
  title: 'Raw Data',
  boxes: [row([
    ['id', 'modifier'],
    ['creationDate', 'modificationDate'],
  ])],
  sections: [{
    id: 'raw-data-general',
    title: 'General',
    boxes: [row([
      ['id'],
      ['modifier'],
    ])],
  }, {
    id: 'raw-data-modification',
    title: 'Modification',
    boxes: [row([
      ['creationDate'],
      ['modificationDate'],
    ])],
  }],
}];
