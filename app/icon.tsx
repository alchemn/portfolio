import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M3 17L10 3L17 17H3Z"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="10" cy="12" r="2" fill="#10b981" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
