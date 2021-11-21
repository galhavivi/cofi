/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import DownloadIcon from '@mui/icons-material/SaveAlt';

export default ({ downloadFormFiles }) => [{
  label: 'Download Files',
  icon: DownloadIcon,
  onClick: downloadFormFiles,
}];
