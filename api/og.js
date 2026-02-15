import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  try {
    return new ImageResponse(
      {
        type: 'div',
        props: {
          children: 'Hello World',
          style: {
            display: 'flex',
            fontSize: 60,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            color: '#42b883',
          },
        },
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message, stack: e.stack }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
