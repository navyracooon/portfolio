'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './FlipCounter.module.css';

type FlipCounterProps = {
  value: number;
  refreshKey: number;
  label: string;
  note: string;
  durationMs?: number;
};

function formatCounterValue(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

function createScrambledValue(target: string) {
  return target
    .split('')
    .map((character) => {
      if (character === ',') {
        return ',';
      }

      return String(Math.floor(Math.random() * 10));
    })
    .join('');
}

function DigitCard({ digit, index, refreshKey }: { digit: string; index: number; refreshKey: number }) {
  return (
    <span className={styles.flipDigit} style={{ animationDelay: `${index * 45}ms` }}>
      <span key={`${digit}-${index}-${refreshKey}`} className={styles.flipDigitFace}>
        {digit}
      </span>
    </span>
  );
}

export function FlipCounter({
  value,
  refreshKey,
  label,
  note,
  durationMs = 500,
}: FlipCounterProps) {
  const targetValue = useMemo(() => {
    return formatCounterValue(value);
  }, [value]);

  const [displayValue, setDisplayValue] = useState(targetValue);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (durationMs <= 0) {
      setDisplayValue(targetValue);
      setIsAnimating(false);
      return;
    }

    let timeoutId = 0;
    const startedAt = performance.now();

    setIsAnimating(true);

    function tick() {
      const now = performance.now();
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / durationMs, 1);

      if (progress >= 1) {
        setDisplayValue(targetValue);
        setIsAnimating(false);
        return;
      }

      setDisplayValue(createScrambledValue(targetValue));

      timeoutId = window.setTimeout(tick, 60);
    }

    tick();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [targetValue, refreshKey, durationMs]);

  const characters = useMemo(() => displayValue.split(''), [displayValue]);
  const animationKey = `${refreshKey}-${displayValue}`;

  return (
    <article className={styles.metricCounterCard}>
      <p className="eyebrow">{label}</p>
      <div className={styles.flipCounter} aria-label={`${label}: ${targetValue}`} aria-busy={isAnimating}>
        {characters.map((character, index) =>
          character === ',' ? (
            <span key={`comma-${index}`} className={styles.flipComma}>
              ,
            </span>
          ) : (
            <DigitCard key={`${index}-${animationKey}`} digit={character} index={index} refreshKey={refreshKey} />
          ),
        )}
      </div>
      <p>{note}</p>
    </article>
  );
}
