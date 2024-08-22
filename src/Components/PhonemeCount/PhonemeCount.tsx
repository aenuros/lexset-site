import React, { useState, useEffect } from "react";
import "./PhonemeCount.scss";
import myImage from "./copy.svg";

function PhonemeCount() {
  const [text, setText] = useState<string>(`
Yes it's true
    I've got sunshine on a cloudy day
And when it's cold outside,
Well I've got the month of May
I guess you say
What could make me feel this way
My love, my love, my love,
Talking bout my love, my love
I've got so much honey
You know the bees envy me
I've got a sweeter song
Oh than the birds in trees
Oh and I know, I know,
I know what you're gonna say
What what could make me feel this way
My love, my love, my love,
Talkin' about my love, my love
I don't need no money
Don't need the right or chance for fame
And I've got all the riches baby
Than anyone could want to claim`);
  let [modifiedText, setModifiedText] = useState<string>("change me");
  let [missingWord, setMissingWord] = useState<string[]>(["test", "me"]);
  let [phonemeCount, setPhonemeCount] = useState<string>("n/a");
  const [data, setData] = useState<string>("AA");
  const [usedPhoneme, setUsedPhoneme] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleModifiedChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setModifiedText(event.target.value);
  };

  const onOptionChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setData(event.target.value);
  };

  function handleClick(): void {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          text: text,
          phoneme: data,
        });

        const requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const url =
          // "https://corsproxy.io/?" +
          encodeURIComponent("https://lexset.pythonanywhere.com/count-phoneme");
        /* global RequestInit */
        const response = await fetch(
          "https://lexset.pythonanywhere.com/count-phoneme",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        setModifiedText(result["empty-bracket"]["full-bracket-text"]);
        setMissingWord(result["empty-bracket"]["missing-word"]);
        setPhonemeCount(result["phoneme-count"]);
        setUsedPhoneme(result["phoneme"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }
  return (
    <div className="PhonemeCount">
      <div id="container">
        <div id="input">
          <h2 className="abeezee-regular">Enter text to analyze here</h2>
          <textarea value={text} onChange={handleChange}></textarea>
          <br />
          <button className="abeezee-regular" onClick={handleClick}>
            Analyze
          </button>
          <div className="abeezee-regular">
            <select
              name="phoneme"
              id="phoneme-select"
              onChange={onOptionChangeHandler}
            >
              <option value="AA">AA (odd - AA D)</option>
              <option value="AE">AE (at - AE T)</option>
              <option value="AH">AH (hut - HH AH T)</option>
              <option value="AO">AO (ought - AO T)</option>
              <option value="AW">AW (cow - K AW)</option>
              <option value="AY">AY (hide - HH AY D)</option>
              <option value="B">B (be - B IY)</option>
              <option value="CH">CH (cheese - CH IY Z)</option>
              <option value="D">D (dee - D IY)</option>
              <option value="DH">DH (thee - DH IY)</option>
              <option value="EH">EH (Ed - EH D)</option>
              <option value="ER">ER (hurt - HH ER T)</option>
              <option value="EY">EY (ate - EY T)</option>
              <option value="F">F (fee - F IY)</option>
              <option value="G">G (green - G R IY N)</option>
              <option value="HH">HH (he - HH IY)</option>
              <option value="IH">IH (it - IH T)</option>
              <option value="IY">IY (eat - IY T)</option>
              <option value="JH">JH (gee - JH IY)</option>
              <option value="K">K (key - K IY)</option>
              <option value="L">L (lee - L IY)</option>
              <option value="M">M (me - M IY)</option>
              <option value="N">N (knee - N IY)</option>
              <option value="NG">NG (ping - P IH NG)</option>
              <option value="OW">OW (oat - OW T)</option>
              <option value="OY">OY (toy - T OY)</option>
              <option value="P">P (pee - P IY)</option>
              <option value="R">R (read - R IY D)</option>
              <option value="S">S (sea - S IY)</option>
              <option value="SH">SH (she - SH IY)</option>
              <option value="T">T (tea - T IY)</option>
              <option value="TH">TH (theta - TH EY T AH)</option>
              <option value="UH">UH (hood - HH UH D)</option>
              <option value="UW">UW (two - T UW)</option>
              <option value="V">V (vee - V IY)</option>
              <option value="W">W (we - W IY)</option>
              <option value="Y">Y (yield - Y IY L D)</option>
              <option value="Z">Z (zee - Z IY)</option>
              <option value="ZH">ZH (seizure - S IY ZH ER)</option>
            </select>
            <p>Currently selected: {data}</p>
          </div>
        </div>

        <div id="output">
          <h2 className="abeezee-regular">Output</h2>
          <div className="copy-block">
            <div className="end-row">
              <button
                onClick={() => navigator.clipboard.writeText(modifiedText)}
              >
                <img src={myImage} alt="My Image" />
              </button>
            </div>
            <textarea
              value={modifiedText}
              onChange={handleModifiedChange}
            ></textarea>
          </div>
          <br />
          <div className="abeezee-regular">Missing words: {missingWord}</div>
          <div className="abeezee-regular">
            phoneme count of {usedPhoneme}: {phonemeCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhonemeCount;
