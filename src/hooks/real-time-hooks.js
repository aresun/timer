import { useEffect, useState } from "react";
// # utils
import { get_hour_minute_of_now } from "../utils/time";

export function useReal_time() {
  const [hour, setHour] = useState(`00`);
  const [minute, setMinute] = useState(`00`);

  // * useEffect: did mount & did update
  useEffect(
    () => {
      // $ start interval update time string
      let interval_id = setInterval(() => {
        const [hour, minute] = get_hour_minute_of_now();

        setHour(hour);
        setMinute(minute);
      }, 200);

      return () => {
        // execute when unmout
        // * cleaning procedures defined here

        if (interval_id) {
          clearInterval(interval_id);
        }
      };
    },
    [
      /* values need monitor, if value changed, trigger clean up proceddures*/
    ]
  );

  return [hour, minute];
}
