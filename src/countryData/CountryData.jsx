import "./CountryData.css";
import React, { useEffect, useState } from "react";

function CountryData() {
  const [countries, setCountries] = useState([]);

  function callApi() {
    fetch("https://restcountries.com/v3/region/asia")
      .then((res) => res.json())
      .then((data) =>
        setCountries(
          data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        )
      )
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    callApi();
  }, []);

  return (
    <React.Fragment>
      <div className="cntr table-responsive p-2 pt-0">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th style={{ width: "100px" }}>Sr No.</th>
              <th>Name</th>
              <th>Capital</th>
              <th style={{ width: "100px" }}>Flag</th>
              <th style={{ width: "100px" }}>Region</th>
              <th>Subregion</th>
              <th>Borders</th>
              <th>Languages</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{country.name.common}</td>
                  <td>{country.capital[0]}</td>
                  <td>
                    <img src={country.flags[0]} alt="flag" className="flag" />
                  </td>
                  <td>{country.region}</td>
                  <td>{country.subregion}</td>
                  <td>{country.borders ? country.borders.join(", ") : "-"}</td>
                  <td>{Object.values(country.languages).join(", ")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="refresh-btn" onClick={callApi}>
          Refresh
        </button>
        <div className="footer"></div>
      </div>
    </React.Fragment>
  );
}

export default CountryData;
