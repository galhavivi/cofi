
/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import DuplicateIcon from '@material-ui/icons/FileCopy';

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
