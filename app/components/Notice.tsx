"use client";

import { useSyncExternalStore } from "react";

const noticeEvent = "sunsky-notice-change";
function subscribe(onStoreChange: () => void) {
  window.addEventListener(noticeEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(noticeEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}
function getSnapshot() {
  return sessionStorage.getItem("sunsky-notice") !== "seen";
}
export default function Notice() {
  const open = useSyncExternalStore(subscribe, getSnapshot, () => false);
  if (!open) return null;
  const close = () => {
    sessionStorage.setItem("sunsky-notice", "seen");
    window.dispatchEvent(new Event(noticeEvent));
  };
  return <div className="notice-backdrop" role="dialog" aria-modal="true"><div className="notice-card"><button aria-label="Close" className="notice-x" onClick={close}>×</button><img src="/images/logo.png" alt="Sun Sky Inn" width={155} height={155} loading="eager" decoding="async"/><span className="eyebrow">Important guest notice</span><h2>Book through our verified channels</h2><p>For your safety, use only our official website, WhatsApp and email. Never send passwords, card PINs or verification codes through messages.</p><div className="notice-actions"><button className="btn btn-dark" onClick={close}>Continue to website</button><a className="btn btn-outline" href="https://wa.me/9609910136">Verify on WhatsApp</a></div></div></div>;
}
