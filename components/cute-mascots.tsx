export function RiceBallMascot({ className = "", size = 80 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Body - rice ball triangle shape */}
      <path
        d="M50 8 C30 8 8 50 8 70 C8 88 28 95 50 95 C72 95 92 88 92 70 C92 50 70 8 50 8Z"
        fill="#FFF5F0"
        stroke="#E8928A"
        strokeWidth="2.5"
      />
      {/* Nori seaweed wrap */}
      <path
        d="M20 65 C20 65 25 95 50 95 C75 95 80 65 80 65 L20 65Z"
        fill="#5D6B3D"
        rx="4"
      />
      {/* Left eye */}
      <ellipse cx="36" cy="48" rx="4" ry="5" fill="#4A3728" />
      <ellipse cx="37.5" cy="46.5" rx="1.5" ry="1.5" fill="white" />
      {/* Right eye */}
      <ellipse cx="64" cy="48" rx="4" ry="5" fill="#4A3728" />
      <ellipse cx="65.5" cy="46.5" rx="1.5" ry="1.5" fill="white" />
      {/* Smile */}
      <path
        d="M42 56 Q50 64 58 56"
        stroke="#4A3728"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Blush left */}
      <ellipse cx="28" cy="55" rx="6" ry="4" fill="#F5B7B1" opacity="0.6" />
      {/* Blush right */}
      <ellipse cx="72" cy="55" rx="6" ry="4" fill="#F5B7B1" opacity="0.6" />
    </svg>
  )
}

export function DumplingMascot({ className = "", size = 80 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Body - dumpling shape */}
      <ellipse cx="50" cy="58" rx="42" ry="32" fill="#FFF5E6" stroke="#E8C18A" strokeWidth="2.5" />
      {/* Crimped top edge */}
      <path
        d="M15 50 Q20 38 28 42 Q34 34 42 40 Q48 32 55 38 Q62 32 68 40 Q76 34 80 42 Q88 38 90 50"
        fill="none"
        stroke="#E8C18A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left eye - happy closed */}
      <path d="M34 56 Q38 52 42 56" stroke="#4A3728" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Right eye - happy closed */}
      <path d="M58 56 Q62 52 66 56" stroke="#4A3728" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Tiny smile */}
      <path
        d="M44 65 Q50 70 56 65"
        stroke="#4A3728"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Blush left */}
      <ellipse cx="30" cy="62" rx="5" ry="3.5" fill="#F5B7B1" opacity="0.5" />
      {/* Blush right */}
      <ellipse cx="70" cy="62" rx="5" ry="3.5" fill="#F5B7B1" opacity="0.5" />
    </svg>
  )
}

export function BowlMascot({ className = "", size = 80 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Steam */}
      <path d="M35 22 Q37 15 35 8" stroke="#E8928A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M50 20 Q52 12 50 5" stroke="#E8928A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M65 22 Q67 15 65 8" stroke="#E8928A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Bowl */}
      <path
        d="M12 42 L12 42 Q12 82 50 85 Q88 82 88 42 Z"
        fill="#FFE4D6"
        stroke="#E8928A"
        strokeWidth="2.5"
      />
      {/* Bowl rim */}
      <ellipse cx="50" cy="42" rx="42" ry="8" fill="#FFF0E8" stroke="#E8928A" strokeWidth="2.5" />
      {/* Food inside */}
      <ellipse cx="50" cy="42" rx="36" ry="5" fill="#E8C18A" opacity="0.6" />
      {/* Left eye */}
      <ellipse cx="38" cy="58" rx="3.5" ry="4" fill="#4A3728" />
      <ellipse cx="39.2" cy="56.5" rx="1.2" ry="1.2" fill="white" />
      {/* Right eye */}
      <ellipse cx="62" cy="58" rx="3.5" ry="4" fill="#4A3728" />
      <ellipse cx="63.2" cy="56.5" rx="1.2" ry="1.2" fill="white" />
      {/* Smile */}
      <path
        d="M44 67 Q50 74 56 67"
        stroke="#4A3728"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Blush */}
      <ellipse cx="32" cy="65" rx="5" ry="3" fill="#F5B7B1" opacity="0.5" />
      <ellipse cx="68" cy="65" rx="5" ry="3" fill="#F5B7B1" opacity="0.5" />
    </svg>
  )
}

export function TacoMascot({ className = "", size = 60 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Shell */}
      <path
        d="M10 70 Q50 10 90 70"
        fill="#F5DEB3"
        stroke="#D4A574"
        strokeWidth="2.5"
      />
      {/* Filling top */}
      <path
        d="M18 65 Q30 45 50 42 Q70 45 82 65"
        fill="#98D89E"
      />
      <path
        d="M22 65 Q40 50 50 48 Q60 50 78 65"
        fill="#F5B7B1"
      />
      {/* Left eye */}
      <ellipse cx="38" cy="58" rx="3" ry="3.5" fill="#4A3728" />
      <ellipse cx="39" cy="57" rx="1" ry="1" fill="white" />
      {/* Right eye */}
      <ellipse cx="62" cy="58" rx="3" ry="3.5" fill="#4A3728" />
      <ellipse cx="63" cy="57" rx="1" ry="1" fill="white" />
      {/* Smile */}
      <path d="M44 64 Q50 69 56 64" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blush */}
      <ellipse cx="32" cy="63" rx="4" ry="2.5" fill="#F5B7B1" opacity="0.5" />
      <ellipse cx="68" cy="63" rx="4" ry="2.5" fill="#F5B7B1" opacity="0.5" />
    </svg>
  )
}

export function SparkleIcon({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0L14.5 8.5L23 12L14.5 15.5L12 24L9.5 15.5L1 12L9.5 8.5Z" />
    </svg>
  )
}

export function HeartIcon({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}
