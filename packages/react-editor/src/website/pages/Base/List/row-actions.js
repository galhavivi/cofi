/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import DuplicateIcon from '@mui/icons-material/FileCopy';
import DownloadIcon from '@mui/icons-material/SaveAlt';

export default ({ edit, duplicate, download, remove }, rowActions = []) => [{
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
  onClick: download,
}, ...rowActions,
{
  label: 'Delete',
  icon: DeleteIcon,
  onClick: remove,
}];
