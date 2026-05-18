'use client';

import { useEffect, useMemo, useState } from 'react';

function DigitCard({ digit, index }: { digit: string; index: number }) {
  return (
    <span className="flip-digit" style={{ animationDelay: `${index * 45}ms` }}>
      <span key={`${digit}-${index}`} className="flip-digit-face">
        {digit}
      </span>
    </span>
  );
}

export function FlipCounter({ value, label, note }: { value: number; label: string; note: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1100;
    const startTime = performance.now();
    const startValue = displayValue;
    const diff = value - startValue;
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + diff * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const digits = useMemo(() => displayValue.toLocaleString('en-US').split(''), [displayValue]);

  return (
    <article className="metric-counter-card">
      <p className="eyebrow">{label}</p>
      <div className="flip-counter" aria-label={`${label}: ${displayValue.toLocaleString('en-US')}`}>
        {digits.map((digit, index) =>
          digit === ',' ? <span key={`comma-${index}`} className="flip-comma">,</span> : <DigitCard key={`${index}-${digit}`} digit={digit} index={index} />,
        )}
      </div>
      <p>{note}</p>
    </article>
  );
}
