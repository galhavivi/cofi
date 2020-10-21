import React from 'react';
import styled from 'styled-components';
import Log from '@cofi/react-components/form/Log';
import { withLog } from '../../../lib';
import Overall from '../react/overall';
import Styled from '../../components/StyledComponents';
import DemoMarkups from '../../components/DemoMarkups';

const CofiLog = withLog(Log);

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  > div {
    flex: 1;
    min-width: 300px;
    max-height: 360px;
    overflow: auto;

    &:nth-child(1) {
      display: flex;
      flex-direction: column;
      [aria-label="Fields"] {
        flex: 1;
        overflow: auto;
      }
    }
    &:nth-child(5) {
      > div > h3:first-child {
        margin-top: 0;
      }
      pre {
        padding: 0 !important;
      }
    }
  }
`;

export default () => (<Flex>
  <Overall.demo />
  <Styled.MainElement>
    <CofiLog />
  </Styled.MainElement>
  <Styled.MainElementLarge>
    <DemoMarkups markup={Overall.markup} />
  </Styled.MainElementLarge>
</Flex>);
