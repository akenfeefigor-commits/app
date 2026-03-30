export default function Marquee() {
  const items = [
    { text: 'МОХИТО', highlight: true },
    { text: '·', highlight: false },
    { text: 'ЛИМОНАД', highlight: false },
    { text: '·', highlight: false },
    { text: 'ОГУРЕЧНЫЙ ТОНИК', highlight: true },
    { text: '·', highlight: false },
    { text: 'КЛУБНИЧНЫЙ МОХИТО', highlight: false },
    { text: '·', highlight: false },
    { text: 'ГРАНАТ-МЯТА', highlight: true },
    { text: '·', highlight: false },
    { text: '17 000 СУМ', highlight: false },
    { text: '·', highlight: false },
    { text: 'SHARBAT', highlight: true },
    { text: '·', highlight: false },
    { text: 'МОЙ НАПИТО', highlight: false },
    { text: '·', highlight: false },
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className={item.highlight ? 'highlight' : ''}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
