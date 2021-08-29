function padding_to_2_digit(num) {
  num < 10 && (num = `0${num}`);

  return `${num}`;
}

export function get_hour_minute_of_now() {
  const now_date = new Date();

  let hour = now_date.getHours();
  hour = padding_to_2_digit(hour);

  let minute = now_date.getMinutes();
  minute = padding_to_2_digit(minute);

  return [hour, minute];
}
