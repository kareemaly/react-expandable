import React from 'react';
import Expandable from './index';
import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  padding: 12px;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

const ItemTitle = styled.div`
`;

const ItemIcon = styled.div`
`;

export default () => (
  <Expandable
    headers={[
      ({ isOpened }) => (
        <ItemHeader>
          <ItemTitle>Tab1</ItemTitle>
          <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
        </ItemHeader>
      ),
      ({ isOpened }) => (
        <ItemHeader>
          <ItemTitle>Tab2</ItemTitle>
          <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
        </ItemHeader>
      ),
      ({ isOpened }) => (
        <ItemHeader>
          <ItemTitle>Tab3</ItemTitle>
          <ItemIcon>{isOpened ? '-' : '+'}</ItemIcon>
        </ItemHeader>
      ),
    ]}
    enableMultiOpen
  >
    <Item>
      first item<br />
      first item<br />
      first item<br />
    </Item>
    <Item>
      second item
    </Item>
    <Item>
      third item
    </Item>
  </Expandable>
);
