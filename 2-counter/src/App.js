import * as React from "react";
const { useState } = React;

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <p>{counter}</p>
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Increase Counter</button>
    </div>
  );
}

export default App;
