"use client";

import { useMemo, useState } from "react";

const partnerCode = "BEZCESTOVKY";
const phone = "9609910136";
const email = "reservation@thoddoosunskyinn.com";

const plans = {
  breakfast: { name: "Raňajky", room: 70, child: 18 },
  halfBoard: { name: "Polpenzia", room: 90, child: 23 },
  fullBoard: { name: "Plná penzia", room: 110, child: 28 },
} as const;

type PlanKey = keyof typeof plans;
type ChildAge = number | "";

function nightsBetween(arrival: string, departure: string) {
  if (!arrival || !departure) return 0;
  const start = Date.parse(`${arrival}T00:00:00Z`);
  const end = Date.parse(`${departure}T00:00:00Z`);
  return Math.max(0, Math.round((end - start) / 86400000));
}

export default function PartnerLanding() {
  const [copyStatus, setCopyStatus] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [adults, setAdults] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [childAges, setChildAges] = useState<ChildAge[]>([]);
  const [plan, setPlan] = useState<PlanKey | "">("");
  const [name, setName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().slice(0, 10);
  const nights = nightsBetween(arrival, departure);
  const selectedPlan = plan ? plans[plan] : null;
  const olderChildren = childAges.filter(age => age !== "" && age > 12).length;
  const eligibleChildren = childAges.filter(age => age !== "" && age >= 2 && age <= 12).length;
  const effectiveAdults = adults + olderChildren;
  const roomAmount = nights * (selectedPlan?.room ?? 0);
  const childAmount = nights * eligibleChildren * (selectedPlan?.child ?? 0);
  const total = roomAmount + childAmount;
  const longStay = nights >= 8;
  const manualConfirmation = effectiveAdults > 2 || childCount > 1 || olderChildren > 0 || effectiveAdults + childCount > 3;

  const changeChildCount = (value: number) => {
    const safeCount = Math.min(6, Math.max(0, value || 0));
    setChildCount(safeCount);
    setChildAges(current => Array.from({ length: safeCount }, (_, index) => current[index] ?? ""));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!arrival) nextErrors.arrival = "Vyberte dátum príchodu.";
    else if (arrival < today) nextErrors.arrival = "Dátum príchodu nemôže byť v minulosti.";
    if (!departure) nextErrors.departure = "Vyberte dátum odchodu.";
    else if (arrival && departure <= arrival) nextErrors.departure = "Dátum odchodu musí byť po dátume príchodu.";
    if (adults < 1) nextErrors.adults = "Uveďte aspoň jedného dospelého hosťa.";
    if (!plan) nextErrors.plan = "Vyberte typ stravovania.";
    if (!name.trim()) nextErrors.name = "Uveďte meno a priezvisko.";
    childAges.forEach((age, index) => {
      if (age === "" || age < 0) nextErrors[`child-${index}`] = "Uveďte platný vek dieťaťa.";
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const agesText = childAges.length ? childAges.map(age => age === "" ? "neuvedený" : `${age}`).join(", ") : "bez detí";
  const snorkelText = longStay ? "áno, po potvrdení hotela" : "nie";
  const totalText = selectedPlan && nights > 0 ? `${total} USD` : "bude vypočítaná po doplnení údajov";
  const enquiryBody = useMemo(() => [
    "Dobrý deň,",
    "",
    `mám záujem o pobyt v Thoddoo Sun Sky Inn s partnerským heslom ${partnerCode}.`,
    "",
    `Heslo: ${partnerCode}`,
    `Príchod: ${arrival || "neuvedený"}`,
    `Odchod: ${departure || "neuvedený"}`,
    `Počet nocí: ${nights}`,
    `Počet dospelých: ${effectiveAdults}`,
    `Počet detí: ${childCount}`,
    `Vek detí: ${agesText}`,
    `Stravovanie: ${selectedPlan?.name ?? "neuvedené"}`,
    `Odhadovaná partnerská cena: ${totalText}`,
    `Nárok na bezplatné šnorchlovanie: ${snorkelText}`,
    `Meno: ${name || "neuvedené"}`,
    `E-mail: ${guestEmail || "neuvedený"}`,
    `Poznámka: ${note || "bez poznámky"}`,
    "",
    "Prosím, potvrďte dostupnosť, vhodné obsadenie izby, zahrnuté služby a konečnú cenu.",
  ].join("\n"), [arrival, departure, nights, effectiveAdults, childCount, agesText, selectedPlan, totalText, snorkelText, name, guestEmail, note]);

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(enquiryBody)}`;
  const emailUrl = `mailto:${email}?subject=${encodeURIComponent(`Rezervácia ${partnerCode}`)}&body=${encodeURIComponent(enquiryBody)}`;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(partnerCode);
      setCopyStatus("Kód bol skopírovaný.");
    } catch {
      setCopyStatus("Kód sa nepodarilo skopírovať. Označte ho a skopírujte ručne.");
    }
  };

  const handleEnquiry = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validate()) event.preventDefault();
  };

  return <div className="partner-landing" lang="sk">
    <section className="partner-hero">
      <img src="/images/island.webp" alt="Tropický ostrov Thoddoo" width={1400} height={788} loading="eager" decoding="async" fetchPriority="high"/>
      <div className="partner-hero-shade"/>
      <div className="shell partner-hero-content">
        <span className="eyebrow light">PARTNERSKÁ PONUKA PRE ČITATEĽOV MARTINY</span>
        <h1>Vitajte, hostia od Martiny</h1>
        <p>Pre hostí, ktorí prichádzajú na odporúčanie Martiny, má Thoddoo Sun Sky Inn pripravené pevné partnerské ceny. Pri komunikácii s hotelom vždy uveďte heslo BEZCESTOVKY.</p>
        <div className="partner-code-block"><strong>{partnerCode}</strong><button type="button" className="btn btn-gold" onClick={copyCode}>Skopírovať kód</button></div>
        <p className="copy-status" aria-live="polite">{copyStatus}</p>
        <p className="partner-trust">Partnerské ceny sú oddelené od sezónnych cien zobrazovaných v online rezervačných systémoch.</p>
      </div>
    </section>

    <section className="partner-section section-cream" aria-labelledby="partner-prices">
      <div className="shell"><span className="eyebrow">Pevná partnerská dohoda</span><h2 id="partner-prices">CENNÍK S HESLOM BEZCESTOVKY</h2>
        <div className="partner-price-grid">
          <article className="partner-price-card"><h3>RAŇAJKY</h3><strong>70 USD</strong><p>izba / noc pre 2 osoby</p><span>35 USD / dospelá osoba / noc</span></article>
          <article className="partner-price-card featured"><h3>POLPENZIA</h3><strong>90 USD</strong><p>izba / noc pre 2 osoby</p><span>45 USD / dospelá osoba / noc</span></article>
          <article className="partner-price-card"><h3>PLNÁ PENZIA</h3><strong>110 USD</strong><p>izba / noc pre 2 osoby</p><span>55 USD / dospelá osoba / noc</span></article>
        </div>
        <div className="partner-note"><p>Základná partnerská cena platí pre jednu izbu a najviac dve dospelé osoby. Dane sú zahrnuté iba vtedy, ak ich hotel potvrdí podľa aktuálnej partnerskej dohody. Dostupnosť aj konečnú cenu musí Thoddoo Sun Sky Inn potvrdiť písomne. Sezónne ceny v iných rezervačných systémoch sa môžu líšiť.</p></div>
      </div>
    </section>

    <section className="partner-section"><div className="shell partner-two-col">
      <div><span className="eyebrow">Rodinný pobyt</span><h2>Ceny pre deti</h2><ul className="partner-list"><li>Deti do 2 rokov: zdarma.</li><li>Deti od 2 do 12 rokov: 18 USD / noc s raňajkami.</li><li>Deti od 2 do 12 rokov: 23 USD / noc s polpenziou.</li><li>Deti od 2 do 12 rokov: 28 USD / noc s plnou penziou.</li><li>Hostia starší ako 12 rokov sa počítajú ako dospelí.</li></ul><p>Ak rodina potrebuje dve prístelky alebo ďalšiu izbu, rezervácia vyžaduje individuálne potvrdenie hotela. Konečná cena závisí od obsadenia, typu izby a dostupnosti.</p></div>
      <div className="partner-gift"><span className="eyebrow light">8 nocí a viac</span><h2>Darček pri dlhšom pobyte</h2><p>Pri pobyte na 8 nocí a viac môžete získať 30 až 45 minút šnorchlovania zdarma.</p><small>Bezplatné šnorchlovanie podlieha potvrdeniu hotela, počasiu, bezpečnostným podmienkam a prevádzkovej dostupnosti.</small></div>
    </div></section>

    <section className="partner-section partner-calculator-section" aria-labelledby="calculator-title"><div className="shell"><span className="eyebrow">Nezávislé od online cien</span><h2 id="calculator-title">Kalkulácia partnerského pobytu</h2><p className="section-intro">Kalkulačka používa výhradne pevné ceny dohody BEZCESTOVKY. Neoveruje dostupnosť a nevytvára rezerváciu.</p>
      <div className="partner-calculator-layout"><form className="partner-form" noValidate onSubmit={event => event.preventDefault()}>
        <div className="partner-field-grid">
          <div className="partner-field"><label htmlFor="arrival">Dátum príchodu</label><input id="arrival" type="date" min={today} value={arrival} onChange={event => setArrival(event.target.value)} aria-invalid={Boolean(errors.arrival)} aria-describedby={errors.arrival ? "arrival-error" : undefined}/>{errors.arrival && <span className="field-error" id="arrival-error">{errors.arrival}</span>}</div>
          <div className="partner-field"><label htmlFor="departure">Dátum odchodu</label><input id="departure" type="date" min={arrival || today} value={departure} onChange={event => setDeparture(event.target.value)} aria-invalid={Boolean(errors.departure)} aria-describedby={errors.departure ? "departure-error" : undefined}/>{errors.departure && <span className="field-error" id="departure-error">{errors.departure}</span>}</div>
          <div className="partner-field"><label htmlFor="adults">Počet dospelých</label><input id="adults" type="number" min="1" max="8" value={adults} onChange={event => setAdults(Math.max(0, Number(event.target.value)))} aria-invalid={Boolean(errors.adults)} aria-describedby={errors.adults ? "adults-error" : undefined}/>{errors.adults && <span className="field-error" id="adults-error">{errors.adults}</span>}</div>
          <div className="partner-field"><label htmlFor="children">Počet detí</label><input id="children" type="number" min="0" max="6" value={childCount} onChange={event => changeChildCount(Number(event.target.value))}/></div>
        </div>
        {childAges.length > 0 && <fieldset className="child-ages"><legend>Vek každého dieťaťa</legend><div className="partner-field-grid">{childAges.map((age, index) => <div className="partner-field" key={index}><label htmlFor={`child-age-${index}`}>Vek dieťaťa {index + 1}</label><input id={`child-age-${index}`} type="number" min="0" max="17" value={age} onChange={event => setChildAges(current => current.map((item, itemIndex) => itemIndex === index ? (event.target.value === "" ? "" : Math.max(0, Number(event.target.value))) : item))} aria-invalid={Boolean(errors[`child-${index}`])}/>{errors[`child-${index}`] && <span className="field-error">{errors[`child-${index}`]}</span>}</div>)}</div></fieldset>}
        <fieldset className="meal-plans" aria-describedby={errors.plan ? "plan-error" : undefined}><legend>Typ stravy</legend><div className="meal-options">{Object.entries(plans).map(([key, item]) => <label key={key}><input type="radio" name="meal-plan" value={key} checked={plan === key} onChange={() => setPlan(key as PlanKey)}/><span><strong>{item.name}</strong><small>{item.room} USD / izba / noc</small></span></label>)}</div>{errors.plan && <span className="field-error" id="plan-error">{errors.plan}</span>}</fieldset>
        <div className="partner-field"><label htmlFor="guest-name">Meno a priezvisko</label><input id="guest-name" type="text" value={name} onChange={event => setName(event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined}/>{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</div>
        <div className="partner-field"><label htmlFor="guest-email">E-mail</label><input id="guest-email" type="email" value={guestEmail} onChange={event => setGuestEmail(event.target.value)} autoComplete="email"/></div>
        <div className="partner-field"><label htmlFor="guest-note">Poznámka alebo špeciálna požiadavka</label><textarea id="guest-note" rows={5} value={note} onChange={event => setNote(event.target.value)}/></div>
        <div className="form-errors" role="status" aria-live="polite">{Object.keys(errors).length > 0 && "Skontrolujte označené polia a doplňte chýbajúce údaje."}</div>
      </form>

      <aside className="partner-summary" aria-live="polite"><span className="eyebrow light">Živý prehľad</span><h3>Odhadovaná cena</h3><dl><div><dt>Počet nocí</dt><dd>{nights}</dd></div><div><dt>Počet dospelých</dt><dd>{effectiveAdults}</dd></div><div><dt>Počet detí</dt><dd>{childCount}</dd></div><div><dt>Stravovanie</dt><dd>{selectedPlan?.name ?? "—"}</dd></div><div><dt>Cena izby</dt><dd>{roomAmount} USD</dd></div><div><dt>Príplatok za deti</dt><dd>{childAmount} USD</dd></div></dl><div className="partner-total"><span>Odhadovaná partnerská cena</span><strong>{total} USD</strong></div><p>Táto suma je orientačná. Dostupnosť, vhodné obsadenie izby, zahrnuté dane a konečnú cenu musí potvrdiť Thoddoo Sun Sky Inn.</p>{manualConfirmation && <div className="manual-warning" role="alert">Táto rezervácia vyžaduje individuálne potvrdenie hotela.</div>}{longStay && <div className="long-stay-message">Váš pobyt spĺňa podmienku na bezplatné 30 až 45 minútové šnorchlovanie, ktoré musí potvrdiť hotel.</div>}<div className="enquiry-actions"><a className="btn btn-gold" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleEnquiry}>Poslať žiadosť cez WhatsApp</a><a className="btn btn-outline" href={emailUrl} onClick={handleEnquiry}>Poslať žiadosť e-mailom</a></div></aside>
      </div>
    </div></section>

    <section className="partner-section section-cream"><div className="shell partner-two-col"><div><span className="eyebrow">Prečo ručné potvrdenie</span><h2>Pevná cena mimo sezónnych systémov</h2><p>Tieto partnerské ceny sú pevne dohodnuté pre hostí odporučených Martinou. Online rezervačné systémy používajú sezónne ceny, preto môžu zobrazovať inú sumu. Rozhodujúce je písomné potvrdenie Thoddoo Sun Sky Inn.</p></div><div className="official-contact"><h3>Thoddoo Sun Sky Inn</h3><p><strong>WhatsApp:</strong><a href="https://wa.me/9609910136">+960 991 0136</a></p><p><strong>E-mail:</strong><a href={`mailto:${email}`}>{email}</a></p></div></div></section>

    <section className="partner-section"><div className="shell"><span className="eyebrow">Malý lokálny penzión</span><h2>Ubytovanie v Thoddoo Sun Sky Inn</h2><div className="partner-content-split"><img className="rounded" src="/images/room-hero.webp" alt="Izba v Thoddoo Sun Sky Inn" width={1400} height={933} loading="lazy" decoding="async"/><div><p>Sun Sky Inn je komorný miestny penzión s deviatimi izbami. Ponúka jednoduché a pohodlné zázemie pre hostí, ktorí chcú objavovať ostrov a očakávajú autentické ubytovanie na obývanom maldivskom ostrove, nie súkromný luxusný rezort.</p><p>Izby majú vlastnú kúpeľňu. Podľa dostupnosti môže byť pripravená manželská posteľ, prístelka alebo detská postieľka. Vo vybavení môže byť klimatizácia, malá chladnička, televízor, uteráky a plážové uteráky. Súčasťou objektu je menší spoločný dvor. Presné usporiadanie a vybavenie izby si nechajte potvrdiť pred príchodom.</p></div></div></div></section>

    <section className="partner-section partner-navy"><div className="shell partner-info-grid"><article><h2>Stravovanie</h2><p>Vybrať si môžete raňajky, polpenziu alebo plnú penziu. Jedlá môžu kombinovať maldivskú a medzinárodnú kuchyňu. Na raňajky sa zvyknú podávať vajcia, pečivo, ovocie, lievance alebo miestne mas huni; obedy a večere môžu zahŕňať ryžu, cestoviny, ryby, kuracie mäso, zeleninu či jedlá vhodné pre deti.</p><p>Diétne požiadavky a detské porcie oznámte vopred. Ponuka závisí od surovín a dennej prípravy. Doručenie obeda na pláž môže byť po dohode možné, nie je však garantované každý deň.</p></article><article><h2>Odvoz na pláž a pohyb po ostrove</h2><p>Žiadny miestny penzión neleží priamo na bikini pláži. Na pláž sa dá prejsť pešo cez ostrov. Sun Sky Inn môže podľa prevádzkových možností zabezpečiť odvoz golfovým vozíkom tam aj späť, nejde však o bezpodmienečne garantovanú službu.</p><p>Dostupnosť bicyklov si overte priamo s hotelom a počítajte aj s chôdzou.</p></article></div></section>

    <section className="partner-section"><div className="shell partner-content-split reverse"><div><span className="eyebrow">Transfer rýchloloďou</span><h2>Ako sa dostať na Thoddoo</h2><p>Hostia zvyčajne cestujú z Malé alebo z okolia letiska pravidelnou rýchloloďou. Plavba trvá približne hodinu, podľa konkrétneho spoja a podmienok na mori. Hotelu pošlite čas medzinárodného príletu a údaje o lete; následne vám oznámi aktuálny cestovný poriadok, miesto stretnutia a pokyny.</p><p>Ak priletíte po poslednom spoji, môže byť potrebné prenocovanie pri Malé alebo letisku. Ceny, harmonogram a transfer vždy potvrďte pred cestou. Po dohode môže hotel zabezpečiť vyzdvihnutie v prístave Thoddoo. Ak trpíte morskou chorobou, pripravte sa vopred a riaďte sa zdravotnou radou.</p></div><img className="rounded" src="/images/lagoon.webp" alt="More pri ostrove Thoddoo" width={1400} height={788} loading="lazy" decoding="async"/></div></section>

    <section className="partner-section section-cream"><div className="shell"><div className="partner-info-grid"><article><span className="eyebrow">Lokálny ostrov</span><h2>Prečo si vybrať Thoddoo</h2><p>Thoddoo patrí medzi zelenšie obývané maldivské ostrovy. Významnú časť územia tvoria ovocné a zeleninové farmy, kde sa pestuje papája, marakuja, melón, ananás či kokos. Ostrov ponúka pohľad na každodenný život miestnej komunity a je dostatočne malý na objavovanie pešo alebo bicyklom.</p><p>Je to odlišný zážitok od pobytu na súkromnom rezortnom ostrove — prirodzenejší, lokálnejší a bližší bežnému životu Maldivčanov.</p></article><article><span className="eyebrow">More a pobrežie</span><h2>Pláže na Thoddoo</h2><p>Na ostrove sú vyhradené turistické bikini pláže, kde je povolené plavkové oblečenie. Sunset Beach a Sunrise Beach môžu mať rozdielne podmienky. Vietor, úlomky koralov, tieň aj čistota vody sa menia; mimo označených pláží rešpektujte miestne pravidlá obliekania.</p><p>Šnorchlovanie závisí od počasia a mora. Korytnačky ani iné živočíchy nemožno garantovať. Používajte vhodnú výbavu, rešpektujte bezpečnostné pokyny a nedotýkajte sa koralov ani zvierat.</p></article></div></div></section>

    <section className="partner-section"><div className="shell"><span className="eyebrow">Dobré vedieť pred cestou</span><h2>Praktické informácie o ostrove</h2><div className="partner-accordion-grid">
      <details><summary>Peniaze a platby</summary><p>Bežne sa používajú USD aj maldivské rufiyaa. Platby kartou nie sú dostupné všade a môžu zahŕňať poplatok. Možnosti si potvrďte s hotelom. Na ostrove môže byť bankomat, no vezmite si aj záložnú hotovosť.</p></details>
      <details><summary>Zdravotná pomoc</summary><p>Na ostrove je základná zdravotná starostlivosť. Vážnejšie prípady môžu vyžadovať prevoz do Malé. Dôrazne odporúčame kvalitné cestovné poistenie.</p></details>
      <details><summary>Obchody</summary><p>Malé supermarkety a obchody so suvenírmi ponúkajú základné potraviny, nápoje, hygienu, opaľovacie prípravky, repelenty a jednoduché potreby. Sortiment sa môže meniť.</p></details>
      <details><summary>Reštaurácie</summary><p>Na ostrove fungujú miestne reštaurácie. Hostia s raňajkami alebo polpenziou tak môžu skúsiť aj iné možnosti. Otváracie hodiny a menu sa menia.</p></details>
      <details><summary>Internet</summary><p>V penzióne môže byť dostupné Wi-Fi. Ak potrebujete stabilnejšie pripojenie po celom ostrove, zvážte miestnu SIM alebo eSIM; pokrytie a ceny balíkov si overte pri príchode.</p></details>
      <details><summary>Oblečenie a miestne zvyky</summary><p>Do tropického podnebia sa hodí ľahké oblečenie. V obývaných častiach voľte striedmejší odev a plavky noste iba na bikini plážach. Alkohol nie je na obývaných lokálnych ostrovoch podľa miestnych zákonov dostupný.</p></details>
      <details><summary>Komáre a zvieratá</summary><p>Repelent sa zíde. Môžete vidieť malé jašterice, kalone, kraby a ďalšie ostrovné živočíchy; nerušte ich a nepribližujte sa k nim nevhodným spôsobom.</p></details>
    </div></div></section>

    <section className="partner-section partner-navy"><div className="shell partner-two-col"><div><span className="eyebrow light">More a ostrov</span><h2>Výlety a zážitky</h2><p>Informovať sa môžete o šnorchlovacích výletoch, piesočných laviciach, pozorovaní morského života, rybolove, denných návštevách rezortov, ostrovných zážitkoch a výletoch loďou.</p><p>Všetko závisí od počasia, bezpečnosti, minimálneho počtu hostí a dostupnosti. Ceny sa potvrdzujú samostatne. Vybrané zážitky plánujte radšej na začiatku pobytu, aby zostal priestor na zmenu termínu. Hotel môže pomôcť s koordináciou, konkrétneho operátora a čas musí potvrdiť.</p></div><div><span className="eyebrow light">Bezpečná rezervácia</span><h2>Potvrdenie rezervácie a platba</h2><p>Vyplnenie kalkulačky nie je potvrdenou rezerváciou. Hotel musí písomne potvrdiť dostupnosť aj konečnú cenu. Termín a spôsob platby dohodnete priamo s hotelom; platba kartou môže byť spoplatnená.</p><p>Nikdy neposielajte PIN ku karte, overovacie kódy ani heslá cez WhatsApp alebo e-mail. Používajte iba oficiálne kontakty Sun Sky Inn uvedené na tejto stránke.</p></div></div></section>

    <section className="partner-section"><div className="shell"><span className="eyebrow">Najčastejšie otázky</span><h2>FAQ pre slovenských hostí</h2><div className="partner-faq">
      <details><summary>Sú partnerské ceny rovnaké ako online ceny?</summary><p>Nie vždy. Partnerská dohoda používa pevné ceny, kým online systémy môžu pracovať so sezónnymi sumami.</p></details>
      <details><summary>Je rezervácia potvrdená po odoslaní formulára?</summary><p>Nie. Ide o žiadosť; rezervácia vznikne až po písomnom potvrdení hotela.</p></details>
      <details><summary>Ako sa dostaneme z letiska na Thoddoo?</summary><p>Najčastejšie pravidelnou rýchloloďou. Hotel po prijatí údajov o lete pošle aktuálne miesto stretnutia a harmonogram.</p></details>
      <details><summary>Sú dane zahrnuté?</summary><p>Iba ak to hotel výslovne potvrdí podľa aktuálnej partnerskej dohody.</p></details>
      <details><summary>Ako sa platí?</summary><p>Termín aj spôsob platby potvrdí hotel. Kartová platba môže mať dodatočný poplatok.</p></details>
      <details><summary>Je odvoz na pláž vždy dostupný?</summary><p>Nie. Golfový vozík závisí od prevádzky a musí byť potvrdený.</p></details>
      <details><summary>Môžeme prísť s deťmi?</summary><p>Áno. Uveďte presný vek detí, aby hotel preveril vhodné obsadenie a cenu.</p></details>
      <details><summary>Čo ak potrebujeme viac izieb?</summary><p>Pošlite požadovaný počet izieb a zloženie skupiny. Hotel pripraví individuálne potvrdenie.</p></details>
      <details><summary>Ako funguje bezplatné šnorchlovanie?</summary><p>Pri pobyte od 8 nocí môže hotel po zohľadnení počasia, bezpečnosti a dostupnosti potvrdiť 30 až 45 minút zdarma.</p></details>
      <details><summary>Môžeme písať po slovensky?</summary><p>Áno, správu môžete poslať po slovensky. Odpoveď môže byť preložená, preto si dôležité ceny a podmienky rezervácie nechajte jasne potvrdiť písomne.</p></details>
    </div></div></section>

    <section className="partner-final"><div className="shell"><span className="eyebrow light">Dôležité upozornenie</span><h2>Potvrdenie hotela je rozhodujúce</h2><p>Partnerské ceny platia až po potvrdení dostupnosti hotelom. Konečná cena závisí od počtu hostí, veku detí, typu stravy, dĺžky pobytu, požadovaného typu izby a aktuálnej dostupnosti.</p><p>Táto partnerská ponuka je určená pre čitateľov a hostí odporučených Martinou.</p></div></section>
  </div>;
}
