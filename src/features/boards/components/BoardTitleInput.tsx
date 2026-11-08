interface BoardTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel: string;
}

export default function BoardTitleInput({
  value,
  onChange,
  placeholder = 'Untitled',
  ariaLabel
}: BoardTitleInputProps) {
  return (
    <input 
      className="board-title-input input-style font-medium"
      type="text"
      maxLength={42}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
}
