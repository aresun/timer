import { useEffect, useRef, useState } from "react";

import styles from "./DurationInput.module.scss";

function DurationInput(props) {
  const [inputed, set_input] = useState(`25`);
  const [duration, setDuration] = useState(1);
  const [time_left, set_time_left] = useState(0);
  const [interval_id, set_interval_id] = useState(0);
  const [is_counting, set_is_counting] = useState(false);
  const input_dom = useRef(null);

  const handleInputChange = (e) => {
    set_input(e.target.value);
  };

  const { record_handler } = props;

  useEffect(() => {
    record_handler(() => {
      set_is_counting(false);

      if (interval_id) {
        clearInterval(interval_id);
        set_interval_id(null);
      }

      setTimeout(() => {
        input_dom.current.focus();
      }, 0);
    });
  }, [record_handler, interval_id, input_dom]);

  const handleInput = (e) => {
    const { key } = e;

    if (key === `Enter`) {
      const duration_ms = +inputed * 60 * 1000;
      const end_time_stamp = new Date().getTime() + duration_ms;

      setDuration(duration_ms);

      if (interval_id) {
        clearInterval(interval_id);
        set_interval_id(null);
      }

      // $ start counting down
      const inter_id = setInterval(() => {
        const now_timestamp = new Date().getTime();

        const _time_left = end_time_stamp - now_timestamp;

        if (_time_left < 0) {
          clearInterval(inter_id);
          set_interval_id(null);
          set_time_left(0);
        } else {
          set_time_left(_time_left);
        }
      }, 200);

      set_interval_id(inter_id);
      set_is_counting(true);
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const input_cpt = (
    <input
      className={styles.durationInput}
      type="text"
      ref={input_dom}
      value={inputed}
      onChange={handleInputChange}
      onKeyPress={handleInput}
      onFocus={handleFocus}
    />
  );

  let rate = 0;
  if (time_left && duration) {
    rate = time_left / duration;
  } else {
    rate = 0;
  }

  const progress_cpt = (
    <div
      className={styles.progress}
      style={{ width: `${rate * 100}%` }}
    ></div>
  );

  return <>{is_counting ? progress_cpt : input_cpt}</>;
}

export default DurationInput;
