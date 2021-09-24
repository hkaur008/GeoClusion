import React from "react";
import "./Table.css";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr lat={country.lat} long={country.long}>
          <td>{country.firstName +" "+ country.lastName}</td>
          <td>
            <strong>{country.country+"("+country.code+")"}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
