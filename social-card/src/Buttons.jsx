import React from "react";
import { socialLinks } from "./data";

function Buttons() {
  const openSocialTab = (url) => {
    const newTab = window.open(url, "_blank", "noopener, noreferrer");
    if (newTab) newTab.opener = null;
  };

  const socialLinksBtn = Object.keys(socialLinks).map((key) => (
    <button
      className="social-btns"
      onClick={() => openSocialTab(socialLinks[key].link)}
      value={key}
    >
      {socialLinks[key].title}
    </button>
  ));

  return <section className="social-btns">{socialLinksBtn}</section>;
}

export default Buttons;
