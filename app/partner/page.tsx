"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getPartnerDestination, partnerCodeError } from "./partner-code";

export default function Partner() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const submitCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const destination = getPartnerDestination(code);

    if (destination) {
      setError("");
      router.push(destination);
      return;
    }

    setError(partnerCodeError);
  };

  return <section className="partner-page"><div className="partner-box"><img src="/images/logo.png" alt="Sun Sky Inn" width={175} height={175} loading="eager" decoding="async"/><span className="eyebrow">Exclusive invitation</span><h1>Welcome through one of our trusted travel partners</h1><p>Enter the private code you received. We will verify it directly and confirm the benefits attached to your invitation.</p><form onSubmit={submitCode} noValidate><label className="partner-label" htmlFor="partner-code">Partner code</label><input id="partner-code" aria-describedby={`partner-code-privacy${error ? " partner-code-error" : ""}`} aria-invalid={Boolean(error)} autoComplete="off" value={code} onChange={event => {setCode(event.target.value);setError("");}} placeholder="Enter your partner code"/><button className="btn btn-gold" type="submit">Unlock offer</button>{error && <p className="partner-error" id="partner-code-error" role="alert">{error}</p>}</form><Link className="text-link" href="/">Return to website</Link><small id="partner-code-privacy">Your code is never displayed publicly and does not change the standard booking experience for other guests.</small></div></section>;
}
