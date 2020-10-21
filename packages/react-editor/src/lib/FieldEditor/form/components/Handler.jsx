/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import styled from 'styled-components';
import Select from '@cofi/react-components/edit/Select';
import JsonEditor from '@cofi/react-components/edit/JsonEditor';
import TextInput from '@cofi/react-components/edit/Text';
import Switch from '@cofi/react-components/edit/Switch';
import Url from '@cofi/react-components/view/Url';

const InputWrapper = styled.div`
  display: flex;

  > div:nth-child(1) {
    flex: 1;
  }

  > div:nth-child(2) {
    flex: 1;
    position: relative;
    top: 1px;
    margin-left: 10px;
  }
`;

const Options = styled.div`
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  a {
    align-self: center;
    flex: 1;
    text-align: end;
  }
`;

export default ({ value = {}, state = {}, invalid, onValueChange, onStateChange }) => {
  const argsName = state.argsName || 'args';

  if (!state.options) return (null);
  
  const isCustom = value.name && !state.options.find(x => x.name === value.name); // options = [{ name, detailsUrl }]
  let selectValue = isCustom ? 'CUSTOM' : value.name;
  let customValue = isCustom ? value.name : undefined;
  let argsChecked = !!value[argsName];

  // second and above renders - take data from the state
  if (Object.keys(state).includes('selectValue')) {  
    selectValue = state.selectValue;
    customValue = state.customValue;
    argsChecked = state.argsChecked;
  }

  const items = state.options.map(x => x.name).sort().map(x => ({ label: x, value: x }));
  items.unshift({ label: 'custom', value: 'CUSTOM' });

  const onSelectChange = (name) => {
    if (name) {
      const isCustom = name === 'CUSTOM';
      const newName = isCustom ? undefined : name;
      onValueChange({ ...value, name: newName }, isCustom);
      onStateChange({ ...state, selectValue: name, customValue: undefined, argsChecked });
    } else {
      onValueChange(undefined, false);
      onStateChange({ ...state, selectValue: undefined, customValue: undefined, argsChecked: undefined });
    }
  };

  const onCustomChange = (name) => {
    const newName = (name || '').trim();
    onValueChange({ ...value, name: newName }, true);
    onStateChange({ ...state, selectValue, customValue: newName, argsChecked });
  };

  const onCheckedArgsChange = (checked) => {
    const newValue = { ...value };
    delete newValue[argsName];
    onValueChange(newValue);
    onStateChange({ ...state, selectValue, customValue, argsChecked: checked });
  };

  const onArgsChange = (args) => {
    const newValue = { ...value };
    newValue[argsName] = args;
    onValueChange(newValue);
  };

  const selectedOption = state.options.find(x => x.name === value.name);

  return (<div>
    <InputWrapper>
      <Select 
        value={selectValue} 
        onValueChange={(name) => onSelectChange(name)} 
        state={{
          searchable: true,
          items,
        }} />
      {
        selectValue === 'CUSTOM' && <TextInput 
          value={customValue}
          onValueChange={(name) => onCustomChange(name)} 
          state={{
            placeholder: 'Custom name',
          }} 
          invalid={invalid} />
      }
    </InputWrapper>
    { selectValue && <Options>
      <Row>
        <div>
          { state.addArgsLabel || 'Add args' }
          <Switch value={argsChecked} onValueChange={checked => onCheckedArgsChange(checked)} />
        </div>
        {
          selectValue !== 'CUSTOM' && selectedOption && selectedOption.detailsUrl && <Url 
            value={selectedOption.detailsUrl} 
            state={{
              label: 'View details',
              target: '_blank',
            }
            } />
        }
      </Row>
      {
        argsChecked && <JsonEditor 
          value={value[argsName] || {}}
          onValueChange={(args) => onArgsChange(args)} 
        />
      }
    </Options>
    }  
  </div>);
};
