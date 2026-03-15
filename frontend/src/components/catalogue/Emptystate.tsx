interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <svg
        className="w-16 h-16 text-gray-200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
        />
      </svg>
      <p
        className="text-gray-400 font-medium text-sm"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        Aucun produit trouvé
      </p>
      <button
        onClick={onReset}
        className="text-xs text-red-600 underline underline-offset-2 hover:text-red-700 transition-colors"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
}