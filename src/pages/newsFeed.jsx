import React, { useEffect, useState } from "react";

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
    <div>
      <h1>News Feed</h1>
      {/* <button onClick={fetchData}>Fetch Data</button> */}
      {
        
        data&&
        data?.map(item=>{
          return (<h1>{item?.title}</h1>)
        })
      }
    </div>
  );
}

export default newsFeed;
