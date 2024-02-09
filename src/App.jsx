import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumberIncluded, setIsNumberIncluded] = useState(false);
  const [isCharIncluded, setIsCharIncluded] = useState(false);
  const passwordRef = useRef(null);
  function generatePassword() {
    let pass = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberIncluded) char += "0123456789";
    if (isCharIncluded) char += "~!@#$%^&*()_+<>?";
    for (let i = 0; i < length; i++) {
      pass += char.charAt(Math.floor(Math.random() * char.length) + 1);
    }
    setPassword(pass);
  }

  useEffect(() => {
    generatePassword();
  }, [length, isNumberIncluded, isCharIncluded, setPassword]);

  function copyPasswordToClipboard() {
    console.log(passwordRef.current);
    passwordRef.current?.focus()
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>
      <div className="flex-col justify-items-center bg-slate-700 p-8 text-white">
        <h1 className="mb-6 text-center text-4xl">Password Generator</h1>
        <div className="mb-4 flex items-center justify-center">
          <input
            type="text"
            className="w-[400px] rounded-l-md bg-white px-3 py-2 text-black"
            value={password}
            // disabled
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="rounded-r-md bg-blue-500 px-4 py-2"
          >
            Copy
          </button>
        </div>
        <div className="mb-6 flex gap-2">
          <input onChange={(e) => setLength(e.target.value)} type="range" name="range" id="range" min={6} max={100} />
          <label htmlFor="range">Range ({length})</label>
          <input
            defaultChecked={false}
            type="checkbox"
            name="number"
            id="isNumber"
            onClick={() => setIsNumberIncluded((prev) => !prev)}
          />
          <label htmlFor="isNumber">Number</label>
          <input
            onClick={() => setIsCharIncluded((prev) => !prev)}
            defaultChecked={false}
            className=""
            type="checkbox"
            name="char"
            id="isChar"
          />
          <label htmlFor="isChar">Character</label>
        </div>
        <button
          onClick={() => generatePassword()}
          className="rounded bg-blue-500 px-4 py-2"
        >
          Generate
        </button>
      </div>
    </>
  );
}

export default App;
