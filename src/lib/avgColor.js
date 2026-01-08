import sharp from "sharp";

export async function averageColorFromUrl(url) {
  const res = await fetch(url, {
    next: { revalidate: 86400 }, // cache 1 day
  });

  if (!res.ok) return { r: 37, g: 99, b: 235 }; // fallback

  const buf = Buffer.from(await res.arrayBuffer());

  const { data, info } = await sharp(buf)
    .resize(64, 64, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let r = 0, g = 0, b = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += info.channels) {
    const pr = data[i];
    const pg = data[i + 1];
    const pb = data[i + 2];

    // skip very dark pixels (your rule)
    if (pr + pg + pb < 60) continue;

    r += pr;
    g += pg;
    b += pb;
    count++;
  }

  if (!count) return { r: 37, g: 99, b: 235 };

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}

export function rgbToCss({ r, g, b }, alpha = 1) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
