import { useState } from "react";
import { buildResultShareText, copyLink } from "../lib/share.js";
import { Sound } from "../lib/sound.js";

// "Copy Link to Share" button + instructions. The copied link is the per-result
// /r/<id> link, so when pasted anywhere it unfurls to show the player's card.
export default function ShareBox({ result }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    Sound.click();
    const ok = await copyLink(buildResultShareText(result));
    setCopied(ok);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="share-box">
      <button className="grid-btn g-copy copy-share-btn" onClick={copy}>
        {copied ? "✓ Link Copied!" : "🔗 Copy Link to Share"}
      </button>
      <p className="share-instructions">
        Click the button above to copy the link, then paste it in <b>Facebook</b>, <b>Instagram</b> or
        <b> X (Twitter)</b> as a status — or in <b>Messenger</b> and <b>WhatsApp</b> — to share your card
        and challenge a friend.
      </p>
    </div>
  );
}
