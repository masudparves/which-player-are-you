import { useState } from "react";
import { buildShareText, platformLinks, nativeShare, copyLink } from "../lib/share.js";

const ICONS = {
  facebook: "Facebook",
  messenger: "Messenger",
  whatsapp: "WhatsApp",
  x: "X",
  copy: "Copy Link",
};

export default function ShareButtons({ userName, result }) {
  const [msg, setMsg] = useState("");
  const text = buildShareText(userName, result);
  const links = platformLinks(text);

  const onCopy = async () => {
    const ok = await copyLink(text);
    setMsg(ok ? "Link copied!" : "Copy failed — long-press to copy.");
  };
  const onNative = async () => {
    const ran = await nativeShare(text);
    if (!ran) setMsg("Use the buttons below to share.");
  };

  return (
    <div className="share-wrap">
      <button className="btn-primary share-native" onClick={onNative}>
        Share my result 📲
      </button>
      <div className="share-grid">
        <a className="share-btn fb" href={links.facebook} target="_blank" rel="noreferrer">{ICONS.facebook}</a>
        <a className="share-btn msg" href={links.messenger} target="_blank" rel="noreferrer">{ICONS.messenger}</a>
        <a className="share-btn wa" href={links.whatsapp} target="_blank" rel="noreferrer">{ICONS.whatsapp}</a>
        <a className="share-btn x" href={links.x} target="_blank" rel="noreferrer">{ICONS.x}</a>
        <button className="share-btn copy" onClick={onCopy}>{ICONS.copy}</button>
      </div>
      {msg && <div className="share-msg">{msg}</div>}
    </div>
  );
}
