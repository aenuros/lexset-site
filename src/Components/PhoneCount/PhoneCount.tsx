import React, { useState, useEffect } from "react";
import "./PhoneCount.scss";
import myImage from "./copy.svg";

function PhoneCount() {
  const [text, setText] = useState<string>(
    "What you want\nBaby [a] got it\nWhat you need\nDo you know [a] got it\n\n\nAll [a]'m asking\nIs for a little respect\nWhen you come home\njust a little bit\nHey baby\njust a little bit"
  );
  let [modifiedText, setModifiedText] = useState<string>("[a]");
  let [missingWord, setMissingWord] = useState<string[]>(["test", "me"]);
  let [phoneCount, setPhoneCount] = useState<string>("n/a");
  const [data, setData] = useState<string>("AA");
  const [usedPhoneme, setUsedPhoneme] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleModifiedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedText(event.target.value);
  };

  function handleClick(): void {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          text: text,
          phone: modifiedText,
        });

        const requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://lexset.pythonanywhere.com/count-phone",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);

        setPhoneCount(result["phone-count"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }
  return (
    <div className="PhoneCount">
      <div id="container">
        <div id="input">
          <h2>Phone Count</h2>

          <textarea value={text} onChange={handleChange}></textarea>
          <h3>Type the phone you are looking for (e.g. [a])</h3>
          <input value={modifiedText} onChange={handleModifiedChange}></input>
          <br />
          <button onClick={handleClick}>Analyze</button>
          <h3>Results</h3>
          <p>
            #of times {modifiedText} appears: {phoneCount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PhoneCount;
