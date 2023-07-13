import React from "react";
import Layout from "./../components/layout/Layout.js";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy-policy.gif"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4 mt-8">
          <h1>Privacy Policy</h1>
          <ul className="m-3">
            <li>Transparent data collection and use</li>
            <li>Robust data security measures</li>
            <li>User consent and control over data</li>
            <li>Clear disclosure of third-party sharing and integrations:</li>
            <li>Retention and deletion of user data</li>
            <li>children's privacy protection</li>

          </ul>

        </div>
      </div>
    </Layout>
  );
};

export default Policy;