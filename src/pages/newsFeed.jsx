import React, { useEffect, useState } from "react";
import UserCard from "./card";
import styles from "styles/cards.module.css";

function newsFeed() {
  // function to fetch the API data

  const [data, setData] = useState([]);

  useEffect(()=>{
    fetchData()
  },[])

  const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

  const fetchData = async () => {
    fetch("https://crypto-news-live3.p.rapidapi.com/news", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "crypto-news-live3.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    })
      .then((response) => {
        const reader = response.body.getReader();
        const decoder = reader.read().then((res) => {
          const decoded = new TextDecoder("utf-8").decode(res.value);
          const parsed = JSON.parse(decoded);
          setData(parsed)
          // console.log(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
console.log(data);
  return (
    <div className={`container ${styles.userlist}`} >
    <h1 style={{color: "white"}}>Daily Crypto Dose</h1>
    <br/>
    {data.map(user=>(
    <UserCard user={user}/>
    ))}
    </div>
  );
}

export default newsFeed;
