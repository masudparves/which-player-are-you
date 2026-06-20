// Loads ALL images in src/assets/banners/ automatically (any filename),
// so you can add/remove banners freely. Shows a random one.
const modules = import.meta.glob("../assets/banners/*", { eager: true });
export const BANNERS = Object.values(modules).map((m) => m.default);

export function randomBanner() {
  return BANNERS[Math.floor(Math.random() * BANNERS.length)];
}

export default function Banner({ src }) {
  return (
    <div className="banner">
      <img src={src} alt="Which Player Are You" decoding="async" fetchpriority="high" />
      <div className="banner-fade" />
    </div>
  );
}
