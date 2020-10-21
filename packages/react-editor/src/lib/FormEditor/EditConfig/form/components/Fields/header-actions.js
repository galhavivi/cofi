/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default ({ add, addFromLibrary, fieldsLibrary }) => {
  const headerActions = [{
    label: 'Add',
    onClick: add,
  }];
  
  if (fieldsLibrary) {
    headerActions.unshift({
      label: 'Add From Library',
      variant: 'outlined',
      onClick: addFromLibrary,
    });
  }

  return headerActions;
};
