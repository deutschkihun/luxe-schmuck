import React, { useState } from "react";

export const NewletterPage = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const submitHandler = () => {
    /*e.preventDefault();
    if (!email === "") {
      alert("Thank you for your subsciption!");
    } else {
      alert("ERR! Please enter valid email address.");
    }*/
  };
  return (
    <section className="section">
      <div className="section__image section__image--c"></div>
      <div className="section__content">
        <h1 className="section__content__title">SIGN UP FOR OUR NEWSLETTER</h1>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <button className="newsletter--btn">SUBSCRIBE</button>
          </div>
        </form>

        <div className="section__icon__container">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
    </section>
  );
};
