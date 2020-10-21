/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { Field } from '@cofi/react-form';
import TextInput from '@cofi/react-components/edit/Text';
import JsonEditor from '@cofi/react-components/edit/JsonEditor';
import HandlerEditor from './HandlerEditor';

const getGrid = (templateAreas) => {
  const fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
  return {
    templateAreas,
    elements: fieldIds.map(id => ({ 
      selector: `#${id}`, 
      gridArea: id, 
      component: Field, 
      props: { id },
    })),
  };
};

export default ({ funcDescription, messageDescription, defaultArgsDescription, 
  stateChangeDescription, rendererDescription, data }) => {
  const fieldIds = ['name'];

  const fields = {
    name: { 
      label: 'Name',
      path: 'name',
      required: true,
      component: { 
        name: 'TextInput',
      },
    },
  };

  if (data.func) {
    fieldIds.push('func');

    fields.func = { 
      label: 'Func',
      description: funcDescription,
      path: 'func',
      required: true,
      validators: [{ name: 'functionStructure' }],
      component: { 
        name: 'HandlerEditor',
      },
    };
  }

  if (data.message) {
    fieldIds.push('message');

    fields.message = { 
      label: 'Message',
      description: messageDescription,
      path: 'message',
      required: true,
      validators: [{ name: 'functionStructure' }],
      component: { 
        name: 'HandlerEditor',
      },
    };
  }

  if (data.defaultArgs) {
    fieldIds.push('defaultArgs');

    fields.defaultArgs = { 
      label: 'Default Args',
      description: defaultArgsDescription,
      path: 'defaultArgs',
      component: { 
        name: 'JsonEditor',
      },
    };
  }

  // For now - use default "TODO" component for custom components, and disable the renderer editor
  // until we find a way to online transform function with jsx to actual function right before the preview - 
  // using the preview utils "resourceStringToFunction" (maybe with online babel plugin "babel-plugin-transform-react-jsx")
  if (data.renderer) {
    fieldIds.push('renderer');

    fields.renderer = { 
      label: 'Renderer',
      description: rendererDescription,
      path: 'renderer',
      required: true,
      validators: [{ name: 'functionStructure' }],
      component: { 
        name: 'HandlerEditor',
        state: { readOnly: true },
      },
    };
  }

  if (data.stateChange) {
    fieldIds.push('stateChange');

    fields.stateChange = { 
      label: 'State Change',
      description: stateChangeDescription,
      path: 'stateChange',
      validators: [{ name: 'functionStructure' }],
      component: { 
        name: 'HandlerEditor',
      },
    };
  }

  return {
    form: {
      model: {
        id: 'handler',
        fields,
        data,
      },
      resources: {
        components: { 
          TextInput,
          HandlerEditor,
          JsonEditor,
        },
        validators: {
          functionStructure: {
            func: ({ value = '' }) => {
              // convert to one line
              const valueOneLine = value.replace(/\n/g, ' ');
        
              // verify value structure is "function (props) { /*...*/ }"
              return /^function\s*?\(props\)\s*\{.*\}$/.test(valueOneLine);
            },
            message: () => 'Function structure should be "function (props) { /*...*/ }" (relevant only for the '
              + 'editor in order to save functions to local storage).',
          },
        },
      },
    },
    item: {
      size: 0,
      sections: [{
        id: 'handler',
        grid: getGrid(fieldIds),
      }],
    },
    itemRenderer: (item, index) => (<div>{index + 1}. {item.name}</div>),
    style: { 
      list: { maxHeight: 'none', marginBottom: '0' },
    },
  };
};
