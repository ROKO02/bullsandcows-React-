import "./App.css";
import Button from "./Button";
import { useState } from "react";

let base = [];
let tryCount = 0;

function App() {
  const [messgae, setMessage] = useState("3개의 숫자를 입력해주세요.");
  const [inputs, setInputs] = useState([0, 0, 0]);
  const [display, setDisplay] = useState(false);

  const clearGame = () => {
    base = [];
    tryCount = 0;
    setMessage("3개의 숫자를 입력해주세요.");
    setInputs([0, 0, 0]);
    setDisplay(false);
  };

  function setBaseNumber() {
    let setBase = [];
    while (setBase.length < 3) {
      let r = Math.floor(Math.random() * (9 - 1) + 1);
      if (!setBase.includes(r)) {
        setBase.push(r);
      }
    }
    return setBase;
  }

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = parseInt(value, 10);
    setInputs(newInputs);
  };

  function playGameRound(input) {
    if (tryCount === 0) {
      base = setBaseNumber();
    }
    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (base[i] === input[i] && i === j) {
          strikes++;
        } else if (base[i] === input[j] && i !== j) {
          balls++;
        }
      }
    }
    tryCount++;

    return { strikes, balls };
  }

  const playGame = () => {
    const { strikes, balls } = playGameRound(inputs);
    let strikeCount = strikes;
    let ballCount = balls;

    setMessage(`스트라이크 : ${strikeCount} \n볼 : ${ballCount}`);
    setInputs([0, 0, 0]);

    if (strikeCount === 3) {
      setDisplay(true);
    } else if (strikeCount === 0 && ballCount === 0) {
      setMessage("OUT!");
    }
  };

  return (
    <div id="container">
      <div className="main-area">
        <div className="main-box">
          <h1 className="text">숫자 야구 게임에 오신 것을 환영합니다.</h1>
          <a href="#play">Play!</a>
        </div>
      </div>
      <div id="play" className="play-area">
        <div className="play-box">
          <div className="text-box">
            <h1 className="text1">{messgae}</h1>
          </div>
          <div className="inputs">
            {inputs.map((value, index) => (
              <input
                key={index}
                className="input"
                type="number"
                min={1}
                max={9}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                required
              />
            ))}
          </div>
          <div className="button-box">
            <Button
              value={"입력"}
              onClick={playGame}
              className={"button"}
            ></Button>
            <Button
              value={"재시작"}
              onClick={clearGame}
              className={"button"}
            ></Button>
          </div>
          {display && (
            <div id="clearText">
              <h1>축하드립니다!</h1>
              <p>{`${tryCount}번만에 맞추셨습니다!!`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
