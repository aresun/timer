// # styles
import styles from "./Time.module.scss";

function Time(props) {
  const handleClickedTime = (e) => {
    props.clicked_handler();
  };

  return (
    <div className={styles.time} onClick={handleClickedTime}>
      <span className={styles.hour}>{props.hour}</span>
      <span className={styles.delimeter}>:</span>
      <span className={styles.minute}>{props.minute}</span>
    </div>
  );
}

export default Time;
