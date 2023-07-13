import React from "react";
import Layout from "./../components/layout/Layout.js";
import '../style/About.css'
const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="container">
        <div className="row contactus ">
          <div className="col-md-7 about-gif">
            <img
              src="/images/aboutus.gif"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <p className="text-justify mt-2">
              Welcome to E-Commerce-App, your ultimate destination for all your online shopping needs. We are a dedicated team of technology enthusiasts and retail experts committed to providing you with a seamless and enjoyable shopping experience.

              At E-Commerce-App, we understand the evolving landscape of online shopping and aim to stay ahead of the curve. Our platform brings together a wide range of products from various trusted sellers and brands, ensuring that you have access to an extensive catalog of high-quality items.

              We pride ourselves on offering a user-friendly interface that is both intuitive and visually appealing. Our app is designed to make your shopping journey effortless, allowing you to browse through categories, search for specific products, and effortlessly make secure purchases with just a few taps.



              Happy shopping,
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;