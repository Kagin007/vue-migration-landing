import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Fetch Inter Bold font
const fontData = await fetch(
  'https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap',
)
  .then((res) => res.text())
  .then((css) => {
    const match = css.match(/src:\s*url\(([^)]+)\)/);
    if (!match) throw new Error('Could not find font URL in CSS');
    return fetch(match[1]);
  })
  .then((res) => res.arrayBuffer());

const element = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#0f172a',
      padding: '60px 80px',
      fontFamily: 'Inter',
    },
    children: [
      // Green diamond accent
      {
        type: 'div',
        props: {
          style: { display: 'flex', fontSize: 48, color: '#42b883', marginBottom: 24 },
          children: '◆',
        },
      },
      // Title
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontSize: 52,
            fontWeight: 700,
            color: '#f1f5f9',
            marginBottom: 16,
          },
          children: 'Vue 2 \u2192 Vue 3 Migration Services',
        },
      },
      // Subtitle
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            fontSize: 26,
            fontWeight: 700,
            color: '#42b883',
            letterSpacing: '0.05em',
            marginBottom: 48,
          },
          children: 'Structured. Incremental. Battle-tested.',
        },
      },
      // Stats row
      {
        type: 'div',
        props: {
          style: { display: 'flex', gap: 48, marginBottom: 40 },
          children: [
            ['300+', 'Files Migrated'],
            ['40', 'Structured Tickets'],
            ['2', 'Sprints'],
            ['0', 'Downtime'],
          ].map(([value, label]) => ({
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', fontSize: 36, fontWeight: 700, color: '#42b883' },
                    children: value,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', fontSize: 14, color: '#94a3b8' },
                    children: label,
                  },
                },
              ],
            },
          })),
        },
      },
      // Divider
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            width: 120,
            height: 2,
            backgroundColor: '#42b883',
            opacity: 0.4,
            marginBottom: 24,
          },
        },
      },
      // Domain
      {
        type: 'div',
        props: {
          style: { display: 'flex', fontSize: 18, color: '#64748b' },
          children: 'vuemigration.dev',
        },
      },
    ],
  },
};

const svg = await satori(element, {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Inter',
      data: Buffer.from(fontData),
      weight: 700,
      style: 'normal',
    },
  ],
});

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
const png = resvg.render().asPng();

const outPath = join(__dirname, '..', 'public', 'og-image.png');
writeFileSync(outPath, png);
console.log(`Generated OG image: ${outPath} (${png.length} bytes)`);
