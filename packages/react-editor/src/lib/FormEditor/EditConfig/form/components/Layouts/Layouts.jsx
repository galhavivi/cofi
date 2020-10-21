/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React, { useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { FormContext } from '@cofi/react-form';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import DuplicateIcon from '@material-ui/icons/FileCopy';
import Grid from '../../../../../Grid';
import downloadJson from '../../../../../utils/downloadJson'; 
import * as Styled from './Styled';


const Layouts = ({ value = {}, onValueChange }) => {
  const form = useContext(FormContext);
  
  const formId = (form.model.data.model || {}).id;

  const setEditing = ({ id, layout }) => form.actions.changeContext({
    ...form.model.context,
    edit: { type: 'layout', item: { id, ...layout } }, 
    preview: { type: 'layout', item: { id, ...layout } },
  });

  const add = () => setEditing({ layout: {}, id: undefined });

  const edit = ({ id, layout }) => setEditing({ id, layout });

  const duplicate = ({ layout }) => setEditing({ layout: cloneDeep(layout), id: undefined });

  const downloadAsJson = ({ id, layout }) => downloadJson(layout, `${formId}-layout-${id}`);

  const remove = ({ id }) => {
    const newValue = { ...value };
    delete newValue[id];
    onValueChange(newValue);
  };
  
  const rowActions = [{
    label: 'Edit',
    icon: EditIcon,
    onClick: edit,
  }, {
    label: 'Duplicate',
    icon: DuplicateIcon,
    onClick: duplicate,
  }, {
    label: 'Download Json',
    icon: DownloadIcon,
    onClick: downloadAsJson,
  }, {
    label: 'Remove',
    icon: DeleteIcon,
    onClick: remove,
  }];

  const headerActions = [{
    label: 'Add',
    onClick: add,
  }];

  const columns = [{
    label: 'Id',
    content: ({ layout, id }) => (<Styled.Link onClick={() => setEditing({ layout, id })}>{id}</Styled.Link>),
  }, {
    label: 'Title',
    content: ({ layout }) => layout.title,
  }, {
    label: 'Layout',
    content: ({ layout }) => layout.layout,
  }, 
  {
    label: 'Sections',
    content: ({ layout }) => (layout.sections || []).length,
  }, 
  ];

  const data = Object.keys(value).sort().map(id => ({ id, layout: value[id] }));
  
  return (<>
    <Styled.GridWrapper>
      <Grid
        columns={columns}
        data={data}
        headerActions={headerActions}
        rowActions={rowActions}
      />
    </Styled.GridWrapper>
  </>);
};

export default Layouts;
