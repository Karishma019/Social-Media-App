import Form from "./components/Form";
import Header from "./components/Header";
import Posts from "./components/Posts";
import { useState } from "react";

function App() {
  const [currentId, setCurrentId] = useState(0);

  return (
    <>
      <Header />
      <div className="container flex">
        <div>
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="w-1/2">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </>
  );
}

export default App;
