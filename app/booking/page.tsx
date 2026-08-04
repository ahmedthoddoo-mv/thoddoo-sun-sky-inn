"use client";
import {useEffect,useState} from "react";

const BOOKING_URL = "https://be.aiosell.com/book/22ffd2f355";

export default function Booking(){
  const [fallback,setFallback]=useState(false);
  const [progress,setProgress]=useState(0);

  useEffect(()=>{
    let start:number|null=null;
    const duration=2200;
    const step=(ts:number)=>{
      if(!start) start=ts;
      const elapsed=ts-start;
      setProgress(Math.min(100,Math.round((elapsed/duration)*100)));
      if(elapsed<duration){requestAnimationFrame(step);}
      else{
        window.location.href=BOOKING_URL;
        setTimeout(()=>setFallback(true),800);
      }
    };
    const id=requestAnimationFrame(step);
    return ()=>cancelAnimationFrame(id);
  },[]);

  return (
    <section className="booking-transition" aria-live="polite">
      <div className="booking-box">
        <img src="/images/logo.png" alt="Thoddoo Sun Sky Inn" className="booking-logo" />
        <h1 className="booking-heading">Redirecting to our secure booking engine…</h1>
        <p className="booking-desc">We&apos;re checking live availability and the latest direct booking rates for your stay.</p>

        <div className="booking-badges" role="list">
          <div className="booking-badge" role="listitem"><span aria-hidden="true">🔒</span> Secure booking</div>
          <div className="booking-badge" role="listitem"><span aria-hidden="true">📅</span> Live availability</div>
          <div className="booking-badge" role="listitem"><span aria-hidden="true">⚡</span> Instant confirmation</div>
        </div>

        <div className="booking-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Redirecting…">
          <div className="booking-bar-fill" style={{width:`${progress}%`}} />
        </div>

        {fallback && (
          <a className="btn btn-gold booking-fallback" href={BOOKING_URL} rel="noopener noreferrer">
            Continue to Secure Booking
          </a>
        )}

        <p className="booking-note">
          Powered by our secure booking partner AIOSELL.<br />
          Your reservation is made directly with Thoddoo Sun Sky Inn.
        </p>
      </div>
    </section>
  );
}
