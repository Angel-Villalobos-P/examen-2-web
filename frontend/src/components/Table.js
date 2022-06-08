import React from "react";

const Table = ({ data }) => {
  const colums = Object.keys(data);

  const Rows = ({ rows }) => {
    const rowNames = Object.keys(rows);
    return (
      <tr>
        {rowNames.map((row, i) => {
          return <th scope="col">{row}</th>;
        })}
      </tr>
    );
  };
  console.log(data);
  return (
    <table className="table table-hover">
      <thead>
        {data.map((dato, index) => {
          return <Rows rows={dato} />;
        })}
      </thead>
    </table>
  );
};

export default Table;
