const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const componentInfo = reactDocs.parse(fs.readFileSync(path.join(__dirname, '../src/Expandable/index.js')).toString());

let readmeProps = `| Property | Type | Default | Description |
| --- | --- | --- | --- |`;

for(const propertyName in componentInfo.props) {
  const propInfo = componentInfo.props[propertyName];
  let propertyType = propInfo.type.name;
  const propertyRequired = propInfo.required;
  const propertyDefault = propInfo.defaultValue ? propInfo.defaultValue.value : '';
  const propertyDescription = propInfo.description;

  if(propertyType === 'arrayOf') {
    propertyType += ` (${propInfo.type.value.name})`;
  }

  if(propertyType === 'shape') {
    propertyType += ` (${_.keys(propInfo.type.value).join(', ')})`;
  }

  readmeProps += `
| ${propertyName}${propertyRequired ? '*' : ''} | ${propertyType} | ${propertyDefault} | ${propertyDescription.replace('|', ':').replace('\n', '<br />')} |`;
}

const actualReadme = fs.readFileSync(path.join(__dirname, '../README.md')).toString();
const pieces = actualReadme.split('Contributing');
const before = pieces[0].split('| Property')[0];

fs.writeFileSync(path.join(__dirname, '../README.md'), 
`${before}${readmeProps}

Contributing${pieces[1]}`);
