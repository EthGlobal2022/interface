import React, { useState } from "react";
import styles from "styles/Home.module.css";
import { useMoralis } from "react-moralis";

function Index() {
  const { Moralis, user } = useMoralis();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = () => {
    if (emailRegex.test(email)) {
      setIsValid(true);
      saveEmail();
    } else {
      setIsValid(false);
      alert("Please enter a valid email address");
    }
  };

  // declare a saying funtion

  const saveEmail = async () => {
    if (email) {
      const query = new Moralis.Query("EmailIds");
      query.equalTo("email", email);
      const result = await query.find();
      if (result.length === 0) {
        const EmailIds = Moralis.Object.extend("EmailIds");
        const newRow = new EmailIds();
        newRow.set("email", email);
        newRow.set("user", user);
        await newRow.save().then((res) => {
          alert("Email saved successfully");
          console.log("Saved");
        });
      } else {
        alert("Email already exists");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 style={{}}>Learn how the</h1>
        <h1 style={{}}>
          <span
            style={{
              color: "#DC00FF",
            }}
          >
            Web3
          </span>{" "}
          works.
        </h1>

        <div className={styles.newsletterInput}>
          <input
            placeholder="vitalik@polygon.com"
            type={"text"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button onClick={validateEmail}>Get Weekly Learns</button>
        </div>
      </div>
      <img className={styles.earth} src="./earth.jpg" />
    </div>
  );
}

export default Index;
