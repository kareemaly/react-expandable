react-expandable
---------------

Installing
------------
```
$ npm install react-expandable --save
```

[Demos](http://www.bitriddler.com/playground/expandable)
--------------

Example
--------------

```javascript
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
```

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| children* | arrayOf (element) |  | An array of react elements, these are the tabs. |
| headers* | arrayOf (func) |  | An array of functions that returns react elements.
<br />The function will be called with an object that has isOpened option. |
| springOptions | shape {<br />`stiffness: number`<br />`damping: number`<br />`precision: number`<br />} |  | React motion configurations.
<br />[More about this here](https://github.com/chenglou/react-motion#--spring-val-number-config-springhelperconfig--opaqueconfig) |
| enableMultiOpen | bool | false | Whether you want to enable multiple opens or not. |

Contributing
--------------
To contribute, follow these steps:
- Fork this repo.
- Clone your fork.
- Run `npm install`
- Run `npm start`
- Goto `localhost:3000`
- Add your patch then push to your fork and submit a pull request

License
---------
MIT
