import PageHero from "../components/PageHero";
export const metadata={title:"Gallery"};
const imgs=['room-hero.webp','room-romance.webp','bathroom.webp','breakfast.webp','garden-room.webp','reception.webp','courtyard.webp','entrance.webp','sandbank.webp','lagoon.webp','island.webp','garden-room-2.webp'];
export default function Gallery(){return <><PageHero title="A glimpse of your island stay" kicker="Gallery" image="/images/courtyard.webp"/><section className="section shell"><div className="masonry">{imgs.map((x,i)=><img key={x} src={'/images/'+x} alt={`Sun Sky Inn gallery ${i+1}`} loading="lazy" decoding="async"/>)}</div></section></>}
