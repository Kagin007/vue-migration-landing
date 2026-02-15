import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwY.ttf',
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    {
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
          // Vue chevron using simple divs
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 32,
              },
              children: {
                type: 'div',
                props: {
                  style: {
                    fontSize: 48,
                    color: '#42b883',
                    fontWeight: 700,
                  },
                  children: '◆',
                },
              },
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
                lineHeight: 1.2,
                marginBottom: 16,
                textAlign: 'center',
              },
              children: 'Vue 2 → Vue 3 Migration Services',
            },
          },
          // Subtitle
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: 26,
                color: '#42b883',
                fontWeight: 700,
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
              style: {
                display: 'flex',
                gap: 48,
                marginBottom: 40,
              },
              children: [
                ['300+', 'Files Migrated'],
                ['40', 'Structured Tickets'],
                ['2', 'Sprints'],
                ['0', 'Downtime'],
              ].map(([value, label]) => ({
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontSize: 36,
                          fontWeight: 700,
                          color: '#42b883',
                        },
                        children: value,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontSize: 14,
                          color: '#94a3b8',
                        },
                        children: label,
                      },
                    },
                  ],
                },
              })),
            },
          },
          // Divider line
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
                borderRadius: 1,
              },
            },
          },
          // Domain
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: 18,
                color: '#64748b',
              },
              children: 'vuemigration.dev',
            },
          },
        ],
      },
    },
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
