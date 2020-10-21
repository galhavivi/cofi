/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import AsyncMultiSelect from '@cofi/react-components/edit/AsyncMultiSelect';
import AsyncSelect from '@cofi/react-components/edit/AsyncSelect';
import CreatableMultiSelect from '@cofi/react-components/edit/CreatableMultiSelect';
import DatePicker from '@cofi/react-components/edit/DatePicker';
import DateTimePicker from '@cofi/react-components/edit/DateTimePicker';
import UrlInput from '@cofi/react-components/edit/Url';
import TextInput from '@cofi/react-components/edit/Text';
import NumberInput from '@cofi/react-components/edit/Number';
import PasswordInput from '@cofi/react-components/edit/Password';
import RadioGroup from '@cofi/react-components/edit/RadioGroup';
import TimePicker from '@cofi/react-components/edit/TimePicker';
import Checkbox from '@cofi/react-components/edit/Checkbox';
import CheckboxCollection from '@cofi/react-components/edit/CheckboxCollection';
import Select from '@cofi/react-components/edit/Select';
import MultiSelect from '@cofi/react-components/edit/MultiSelect';
import JsonEditor from '@cofi/react-components/edit/JsonEditor';
import Switch from '@cofi/react-components/edit/Switch';
import Url from '@cofi/react-components/view/Url';
import Date from '@cofi/react-components/view/Date';
import Number from '@cofi/react-components/view/Number';
import Text from '@cofi/react-components/view/Text';
import Boolean from '@cofi/react-components/view/Boolean';
import JsonView from '@cofi/react-components/view/JsonView';

const _components = {
  AsyncMultiSelect,
  AsyncSelect,
  CreatableMultiSelect,
  DatePicker,
  DateTimePicker,
  UrlInput,
  TextInput,
  NumberInput,
  PasswordInput,
  RadioGroup,
  Checkbox,
  CheckboxCollection,
  Select,
  MultiSelect,
  JsonEditor,
  TimePicker,
  Url,
  Switch,
  JsonView,
  Boolean,
  Date,
  Text,
  Number,
};

const URL_PREFIX = 'https://galhavivi.github.com/cofi/demo-react-components.html#';

const components = {};

Object.keys(_components).forEach(name => 
  components[name] = { renderer: _components[name], detailsUrl: `${URL_PREFIX}${(name).toLowerCase()}` });

export default components;
