/* eslint-disable react/prop-types */
import React from 'react';

function Table(props) {
  // Data
  const { columns, rows, dataProperties } = props;

  const tableHeaders = (
    <thead>
      <tr>
        {columns.map((column) => <th>{column}</th>)}
      </tr>
    </thead>
  );

  const tableBody = rows.map((row) => (
    <tr>
      {dataProperties.map((property) =>
      // if (column === 'linkedinValue') {
      //   return <td><a href={row[column]} target="_blank" rel="noreferrer">{row[column]}</a></td>;
      // }
      // if (column === 'lastConnectionValue' || column === 'nextConnectionValue') {
      //   const date = new Date(row[column]);
      //   return <td>{date.toDateString()}</td>;
      // }
        <td>{row[property]}</td>)}
    </tr>
  ));

  return (
    <table className="styled-table" width="100%">
      {tableHeaders}
      <tbody>
        {tableBody}
      </tbody>
    </table>
  );
}

export default Table;
