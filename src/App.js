import Time from "./cpt/Time";
import DurationInput from "./cpt/DurationInput";
// # hooks
import { useApp } from "./hooks/app-hooks";

let handler = null;
const record_handler = function (handler_fn) {
  handler = handler_fn;
};
const clicked_handler = () => {
  handler();
};

function App() {
  const [hour, minute] = useApp();

  // # start
  return (
    <div className="App">
      <Time
        hour={hour}
        minute={minute}
        clicked_handler={clicked_handler}
      />

      <DurationInput
        hour={hour}
        minute={minute}
        record_handler={record_handler}
      />
    </div>
  );
}

export default App;
