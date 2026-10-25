import { Link } from "react-router-dom";
import Input from "../../../components/ui/Input";

type SearchFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchField({ label, value, onChange }: SearchFieldProps) {
  return (
    <div className="relative">
      <img src="/lupa.png" alt="" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="search"
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        fullWidth
        className="h-10 min-w-0 rounded-sm bg-white pl-10 text-left text-xs placeholder:text-gray-400"
      />
    </div>
  );
}

type FilterButtonsProps<T extends string> = {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
};

export function FilterButtons<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: FilterButtonsProps<T>) {
  return (
    <div role="group" aria-label={label} className="grid auto-cols-fr grid-flow-col gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={selected === option}
          onClick={() => onSelect(option)}
          className={[
            "min-h-10 min-w-0 rounded-sm border px-2 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600",
            selected === option
              ? "border-red-500 bg-red-50 text-red-600"
              : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
          ].join(" ")}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

type RowActionsProps = {
  editPath: string;
  name: string;
  onDelete: () => void;
};

export function RowActions({ editPath, name, onDelete }: RowActionsProps) {
  const actionClass = "flex h-8 w-7 items-center justify-center rounded-sm border border-gray-300 bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link to={editPath} aria-label={`Editar ${name}`} className={`${actionClass} text-gray-600 hover:bg-gray-100`}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
          <circle cx="9" cy="6" r="3" fill="currentColor" stroke="none" />
          <path d="M3 19v-3a6 6 0 0 1 8-5" />
          <path d="m13 16 6-6 3 3-6 6-4 1 1-4Z" strokeLinejoin="round" />
        </svg>
      </Link>
      <button type="button" aria-label={`Eliminar ${name}`} onClick={onDelete} className={`${actionClass} text-red-500 hover:bg-red-50`}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
          <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export function UserIcon({ add = false }: { add?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
      <circle cx="10" cy="7" r="3" fill={add ? "none" : "currentColor"} />
      <path d="M3 21v-3a7 7 0 0 1 14 0v3H3Z" fill={add ? "none" : "currentColor"} strokeLinejoin="round" />
      {add && <path d="M20 10v8M16 14h8" />}
    </svg>
  );
}
