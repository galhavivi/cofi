
/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Create';
import DownloadIcon from '@mui/icons-material/SaveAlt';
import DuplicateIcon from '@mui/icons-material/FileCopy';

export default ({ setEditing, duplicate, download, remove }) => [{
  label: 'Edit',
  icon: EditIcon,
  onClick: setEditing,
}, {
  label: 'Duplicate',
  icon: DuplicateIcon,
  onClick: duplicate,
}, {
  label: 'Download Json',
  icon: DownloadIcon,
  onClick: download,
}, {
  label: 'Remove',
  icon: DeleteIcon,
  onClick: remove,
}];
