import { useState } from "react";
import BasicTable from "../components/BasicTable";
import { useParams } from "react-router-dom";

function TenantPage() {
  const [tenantDetails, setTenantDetails] = useState({
    f_name: "Car",
    l_name: "Re",
    d_o_b: "5 / 6 / 201",
    email: "cr5@gmail.com",
    username: "caon35",
    pwd: "**********",
    phone_number: "0782808",
  });

  return (
    <>
      <div>TenantPage</div>
      {tenantDetails.map((data) => {
        return <p>{data}</p>;
      })}
    </>
  );
}

export default TenantPage;
