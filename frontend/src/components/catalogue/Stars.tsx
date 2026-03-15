interface StarsProps {
  rating: number;
}

export default function Stars({ rating }: StarsProps) {
  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.09L6 7.82 3.22 9.55l.53-3.09L1.5 4.27l3.11-.45L6 1z"
            fill={s <= rating ? "#e63329" : "#e5e7eb"}
          />
        </svg>
      ))}
    </div>
  );
}