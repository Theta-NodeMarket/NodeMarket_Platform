import styles from "./learnMoreParagraph.module.scss";

interface learnMoreParagraphData {
  Heading: string;
  StanzaOne: string;
  StanzaTwo: string;
}

export default function LearnMoreParagraph(props: learnMoreParagraphData) {
  return (
    <div className={styles.paragraph}>
      <h1 className={styles.heading}>{props.Heading}</h1>
      <div className={styles.stanza_wrap}>
        <p className={styles.body1}>{props.StanzaOne}</p>
        <p className={styles.body2}>{props.StanzaTwo}</p>
      </div>
    </div>
  );
}
