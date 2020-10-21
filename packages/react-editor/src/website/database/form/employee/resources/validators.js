/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

export default {
  noSpecialCharacters: {
    defaultArgs: { chars: ['!', '@', '#', '$', '%', '^', '&', '*'] },
    func: `function (props) {
  return !props.args.chars.find(char => props.value.includes(char));
}`,
    message: `function (props) {
  return \`Special characters not allowed: \${props.args.chars.join(', ')}\`;
}`,
  },
};
