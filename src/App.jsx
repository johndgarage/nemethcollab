import { useEffect } from "react";
import { UserList } from "./components/UserList";

function App() {
  useEffect(() => {
    console.log("Do some application initialization here.");
  }, []);

  return (
    <div>
      <h1>App</h1>
      <UserList />
    </div>
  );
}

export default App;
