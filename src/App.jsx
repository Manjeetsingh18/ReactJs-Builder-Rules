import React, { useState } from 'react';
import 'react-querybuilder/dist/query-builder.css';
import './styles.css';
import { defaultOperators, QueryBuilder } from 'react-querybuilder';

function App() {

  const fields = [
    {
      name: 'name',
      label: 'Name',
      operators: [
        { name: '=', label: 'is' },
        { name: 'beginsWith', label: 'begins with' },
      ],
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      // operators: [{ name: '=', label: 'is' }],
      datatype: 'date',
    },
    {
      name: 'dateRange',
      label: 'Date Range',
      // operators: [{ name: 'between', label: 'is between' }],
      datatype: 'dateRange',
    },
    { name: 'birthday', label: 'Birthday', datatype: 'date', inputType: 'date' },
    { name: 'guitars', label: 'Guitars', datatype: 'number', inputType: 'number' },
    {
      name: 'favoriteMovie',
      label: 'Favorite Movie',
      datatype: 'text',
      operators: [{ name: '=', label: 'is' }],
    },
  ];

  const getOperators = (fieldName) => {
    const field = fields.find(fld => fld.name === fieldName);

    switch (field.datatype) {
      case 'text':
        return [
          { name: '=', label: 'is' },
          { name: '!=', label: 'is not' },
          ...defaultOperators.filter(op =>
            [
              'contains',
              'beginsWith',
              'endsWith',
              'doesNotContain',
              'doesNotBeginWith',
              'doesNotEndWith',
              'null',
              'notNull',
              'in',
              'notIn',
            ].includes(op.name)
          ),
        ];
      case 'number':
        return [
          ...defaultOperators.filter(op => ['=', '!='].includes(op.name)),
          { name: '<', label: 'less than' },
          { name: '<=', label: 'less than or equal to' },
          { name: '>', label: 'greater than' },
          { name: '>=', label: 'greater than or equal to' },
          ...defaultOperators.filter(op => ['null', 'notNull'].includes(op.name)),
        ];
      case 'date':
        return [
          { name: '=', label: 'on' },
          { name: '!=', label: 'not on' },
          { name: '<', label: 'before' },
          { name: '<=', label: 'on or before' },
          { name: '>', label: 'after' },
          { name: '>=', label: 'on or after' },
          ...defaultOperators.filter(op => ['null', 'notNull'].includes(op.name)),
        ];
    }
    return defaultOperators;
  };

  const defaultQuery = {
    combinator: 'and',
    rules: [
      { field: 'name', operator: 'beginsWith', value: 'Stev' },
      { field: 'birthday', operator: '<', value: '1970-01-01' },
      { field: 'guitars', operator: '>', value: 5 },
      { field: 'favoriteMovie', operator: '=', value: 'Crossroads (1986)' },
    ],
  };

  return (
    <div>
      <QueryBuilder fields={fields} defaultQuery={defaultQuery} getOperators={getOperators} />
    </div>
  )
}
export default App;