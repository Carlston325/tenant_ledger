import { useState } from "react";
import { useParams } from "react-router-dom";

function TenantPage() {
  const [tenantDetails, setTenantDetails] = useState([
    {
      f_name: "Car",
      l_name: "Re",
      d_o_b: "5 / 6 / 201",
      email: "cr5@gmail.com",
      phone_number: "0782808",
    },
  ]);

  return (
    <>
      <div>TenantPage</div>
      {tenantDetails.map((data, index) => (
        <div key={index} id={index}>
          <p>First Name: {data.f_name}</p>
          <p>Last Name: {data.l_name}</p>
          <p>Date of Birth: {data.d_o_b}</p>
          <p>Email: {data.email}</p>
          <p>Phone Number: {data.phone_number}</p>
        </div>
      ))}
    </>
  );
}

export default TenantPage;
