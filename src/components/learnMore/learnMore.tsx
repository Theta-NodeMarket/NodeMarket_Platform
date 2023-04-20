import React from "react";
import LearnMoreParagraph from "./learnMoreParagraph";
import styles from "./learnMore.module.scss";

export default function LearnMore() {
  return (
    <section className={styles.learnMore}>
      <div className={styles.learnMore_paragraph_wrapper}>
        <LearnMoreParagraph
          Heading="Decentralized Storage"
          StanzaOne="We empower you to effortlessly manage your marketing campaigns without the hassle of media storage. With our service, your media is accessible to your target audience, anytime and anywhere, thereby enabling you to focus on achieving your marketing goals."
        />

        <LearnMoreParagraph
          Heading="Distribute Globally"
          StanzaOne="Harness the transformative potential of Web3 and concentrate on your key objectives. Our service enables you to efficiently share your media with the aid of the Theta Network, thereby streamlining your operations and providing you with a competitive edge."
        />

        <LearnMoreParagraph
          Heading="Manage Seamlessly"
          StanzaOne="Efficiently track, share, and promote your brand in a unified location with our comprehensive service. Our platform empowers you to focus on expanding your brand while we handle the logistics, enabling you to hit the ground running and achieve your business objectives."
        />
      </div>
    </section>
  );
}
