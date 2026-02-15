import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwY.ttf',
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0f172a',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Background grid effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(rgba(66,184,131,1) 1px, transparent 1px), linear-gradient(90deg, rgba(66,184,131,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Green glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(66,184,131,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Vue logo */}
        <svg
          width="80"
          height="70"
          viewBox="0 0 261.76 226.69"
          style={{ marginBottom: '32px' }}
        >
          <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
            <path
              d="m178.04 235.01-22.056-38.208-22.056 38.208h-40.836l62.892-108.96 62.892 108.96z"
              fill="#42b883"
            />
            <path
              d="m178.04 235.01-22.056-38.208-22.056 38.208h-15.832l37.888-65.64 37.888 65.64z"
              fill="#64748b"
            />
          </g>
        </svg>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#f1f5f9',
              lineHeight: 1.2,
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            Vue 2 → Vue 3 Migration Services
          </div>

          <div
            style={{
              fontSize: 26,
              color: '#42b883',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '40px',
              display: 'flex',
            }}
          >
            Structured. Incremental. Battle-tested.
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            marginBottom: '40px',
          }}
        >
          {[
            ['300+', 'Files Migrated'],
            ['40', 'Structured Tickets'],
            ['2', 'Sprints'],
            ['0', 'Downtime'],
          ].map(([value, label]) => (
            <div
              key={value}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: '#42b883',
                }}
              >
                {value}
              </span>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: 18,
            color: '#64748b',
            display: 'flex',
          }}
        >
          vuemigration.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );
}
