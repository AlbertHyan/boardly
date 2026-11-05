export default function BoardTitleInput({
  value,
  onChange,
  placeholder = 'Untitled',
  ariaLabel
}) {
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
