const whatsapp = "https://wa.me/9609910136?text=Hello%20Thoddoo%20Sun%20Sky%20Inn%2C%20I%27d%20like%20to%20book%20a%20stay.";

const images = {
  hero: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2200&q=90",
  island: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1600&q=85",
  roomOne: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=85",
  roomTwo: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85",
  snorkel: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1400&q=85",
  sandbank: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
  dinner: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=85",
  palm: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
};

export default function Home() {
  return (
    <main>
      <section className="hero" id="home" style={{ backgroundImage: `linear-gradient(180deg,rgba(3,30,29,.16),rgba(3,30,29,.64)),url(${images.hero})` }}>
        <header className="nav shell">
          <a className="brand" href="#home" aria-label="Thoddoo Sun Sky Inn home">
            <span className="brand-mark">SS</span>
            <span>THODDOO<br/><b>SUN SKY INN</b></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#story">The Inn</a><a href="#rooms">Rooms</a><a href="#experiences">Experiences</a><a href="#gallery">Gallery</a>
          </nav>
          <a className="nav-book" href={whatsapp}>Book your stay <span>↗</span></a>
          <details className="mobile-menu">
            <summary aria-label="Open menu">Menu</summary>
            <div><a href="#story">The Inn</a><a href="#rooms">Rooms</a><a href="#experiences">Experiences</a><a href="#gallery">Gallery</a><a href={whatsapp}>Book now</a></div>
          </details>
        </header>

        <div className="hero-content shell">
          <p className="eyebrow light">THODDOO · NORTH ARI ATOLL · MALDIVES</p>
          <h1>Your island story<br/>starts <em>here.</em></h1>
          <p className="hero-copy">A soulful island stay where turquoise days, warm local hospitality, and the unhurried rhythm of Thoddoo come naturally.</p>
          <div className="hero-actions"><a className="button coral" href={whatsapp}>Plan your stay <span>→</span></a><a className="text-link" href="#story">Discover the island <span>↓</span></a></div>
        </div>
        <div className="hero-foot shell"><span>04°26′N · 72°57′E</span><span>SCROLL TO EXPLORE</span><span>+960 991 0136</span></div>
      </section>

      <section className="intro shell" id="story">
        <div><p className="eyebrow">A DIFFERENT KIND OF MALDIVES</p><span className="sun-symbol">☼</span></div>
        <div className="intro-copy">
          <h2>Come as a traveller.<br/><em>Leave as family.</em></h2>
          <p>On the lush island of Thoddoo, life moves with the tides. Our intimate guesthouse places you close to white-sand beaches, fruit farms, and a community that welcomes you in.</p>
          <a className="line-link" href="#rooms">Meet your island home <span>↗</span></a>
        </div>
      </section>

      <section className="image-story shell">
        <div className="tall-image"><img src={images.island} alt="Turquoise water and tropical island in the Maldives"/><span className="image-label">01 · THODDOO ISLAND</span></div>
        <div className="story-note"><span className="big-number">6</span><p>thoughtful rooms,<br/>one unforgettable island.</p><div className="mini-rule"/><p className="small">Barefoot comfort, genuine care, and everything you need to settle into island time.</p></div>
      </section>

      <section className="rooms" id="rooms">
        <div className="shell section-head"><div><p className="eyebrow">REST EASY</p><h2>Rooms made for<br/><em>slow mornings.</em></h2></div><p>Cool, calm, and considered—your private retreat after sun-filled days on the island.</p></div>
        <div className="room-grid shell">
          <article className="room-card"><div className="room-image"><img src={images.roomOne} alt="Deluxe room with extra bed"/><span>UP TO 3 GUESTS</span></div><div className="room-info"><p>01</p><div><h3>Deluxe Room<br/>with Extra Bed</h3><p>Queen bed · Extra bed · Bar fridge · Air conditioning</p></div><a href={whatsapp} aria-label="Book deluxe room with extra bed">↗</a></div></article>
          <article className="room-card offset"><div className="room-image"><img src={images.roomTwo} alt="Bright deluxe room"/><span>PERFECT FOR TWO</span></div><div className="room-info"><p>02</p><div><h3>Deluxe<br/>Room</h3><p>Queen-size bed · Bar fridge · Air conditioning · Wi-Fi</p></div><a href={whatsapp} aria-label="Book deluxe room">↗</a></div></article>
        </div>
      </section>

      <section className="experiences" id="experiences">
        <div className="shell section-head inverse"><div><p className="eyebrow light">FOLLOW THE SUN</p><h2>Days worth<br/><em>remembering.</em></h2></div><p>Swim with turtles, drift over coral gardens, picnic on a sandbank, or simply do nothing at all.</p></div>
        <div className="experience-row shell">
          {[['01',images.snorkel,'Snorkelling','Coral gardens & turtles'],['02',images.sandbank,'Sandbank escape','Your own patch of blue'],['03',images.dinner,'Island dining','Fresh, local & generous']].map(([n,img,title,desc])=><article key={n}><div><img src={img} alt={title}/><span>{n}</span></div><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
        <div className="experience-cta shell"><a className="button pale" href={whatsapp}>Explore all experiences <span>→</span></a></div>
      </section>

      <section className="amenities shell">
        <div><p className="eyebrow">THE LITTLE THINGS</p><h2>Everything you need.<br/><em>Nothing you don’t.</em></h2></div>
        <div className="amenity-list">
          {['Daily breakfast','Free island-wide Wi-Fi','Beach towels & gear','Airport transfer help','Excursions arranged','Warm local guidance'].map((item,i)=><div key={item}><span>0{i+1}</span><p>{item}</p><b>✦</b></div>)}
        </div>
      </section>

      <section className="quote"><div className="shell"><span className="quote-mark">“</span><blockquote>One felt at home thanks to the family atmosphere. Peace and quiet—just complete relaxation.</blockquote><p>EVA · SLOVAKIA</p></div></section>

      <section className="gallery shell" id="gallery">
        <div className="gallery-title"><p className="eyebrow">POSTCARDS FROM PARADISE</p><h2>The island,<br/><em>through our eyes.</em></h2></div>
        <img className="g-one" src={images.palm} alt="Palm trees in the tropical sun"/><img className="g-two" src={images.sandbank} alt="Clear blue water on a Maldives beach"/><img className="g-three" src={images.island} alt="Maldives island coastline"/>
      </section>

      <section className="booking" style={{backgroundImage:`linear-gradient(90deg,rgba(4,36,34,.72),rgba(4,36,34,.2)),url(${images.hero})`}}>
        <div className="shell"><p className="eyebrow light">YOUR ISLAND IS WAITING</p><h2>Ready to trade<br/>rush hour for <em>island time?</em></h2><p>Message us directly and let’s plan a stay that feels entirely your own.</p><a className="button coral" href={whatsapp}>Book on WhatsApp <span>↗</span></a></div>
      </section>

      <footer>
        <div className="shell footer-main"><div className="footer-brand"><span className="brand-mark">SS</span><h3>THODDOO<br/><b>SUN SKY INN</b></h3><p>Your home on the island.</p></div><div><p className="footer-label">EXPLORE</p><a href="#story">The Inn</a><a href="#rooms">Rooms</a><a href="#experiences">Experiences</a><a href="#gallery">Gallery</a></div><div><p className="footer-label">FIND US</p><p>Bokarumaage<br/>AA. Thoddoo<br/>Republic of Maldives</p></div><div><p className="footer-label">TALK TO US</p><a href="tel:+9609910136">+960 991 0136</a><a href={whatsapp}>WhatsApp ↗</a></div></div>
        <div className="shell footer-bottom"><span>© 2026 THODDOO SUN SKY INN</span><span>04°26′N · 72°57′E</span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
