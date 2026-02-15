import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Minimal React.createElement replacement — Satori requires $$typeof
const REACT_ELEMENT = Symbol.for('react.element');
function h(type, props, ...children) {
  return {
    $$typeof: REACT_ELEMENT,
    type,
    props: {
      ...props,
      children: children.length <= 1 ? children[0] : children,
    },
    key: null,
  };
}

export default async function handler() {
  const interBold = await fetch(
    new URL('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap'),
  )
    .then((res) => res.text())
    .then((css) => {
      const match = css.match(/src:\s*url\(([^)]+)\)/);
      return match ? fetch(match[1]).then((r) => r.arrayBuffer()) : null;
    });

  const fontConfig = interBold
    ? [{ name: 'Inter', data: interBold, weight: 700, style: 'normal' }]
    : [];

  return new ImageResponse(
    h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#0f172a',
        padding: '60px 80px',
        fontFamily: interBold ? 'Inter' : 'sans-serif',
      },
    },
      // Green diamond accent
      h('div', {
        style: { display: 'flex', fontSize: 48, color: '#42b883', marginBottom: 24 },
      }, '◆'),

      // Title
      h('div', {
        style: {
          display: 'flex',
          fontSize: 52,
          fontWeight: 700,
          color: '#f1f5f9',
          marginBottom: 16,
        },
      }, 'Vue 2 \u2192 Vue 3 Migration Services'),

      // Subtitle
      h('div', {
        style: {
          display: 'flex',
          fontSize: 26,
          fontWeight: 700,
          color: '#42b883',
          letterSpacing: '0.05em',
          marginBottom: 48,
        },
      }, 'Structured. Incremental. Battle-tested.'),

      // Stats row
      h('div', { style: { display: 'flex', gap: 48, marginBottom: 40 } },
        ...['300+', '40', '2', '0'].map((val, i) =>
          h('div', {
            style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
          },
            h('div', {
              style: { display: 'flex', fontSize: 36, fontWeight: 700, color: '#42b883' },
            }, val),
            h('div', {
              style: { display: 'flex', fontSize: 14, color: '#94a3b8' },
            }, ['Files Migrated', 'Structured Tickets', 'Sprints', 'Downtime'][i]),
          ),
        ),
      ),

      // Divider
      h('div', {
        style: {
          display: 'flex',
          width: 120,
          height: 2,
          backgroundColor: '#42b883',
          opacity: 0.4,
          marginBottom: 24,
        },
      }),

      // Domain
      h('div', {
        style: { display: 'flex', fontSize: 18, color: '#64748b' },
      }, 'vuemigration.dev'),
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontConfig,
    },
  );
}
