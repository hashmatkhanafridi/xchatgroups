import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const size = {
  width: 48,
  height: 48,
};

export const contentType = 'image/png';
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M12 7v6"/>
          <path d="M9 10h6"/>
        </svg>
      </div>
    ),
    { ...size }
  );
}
