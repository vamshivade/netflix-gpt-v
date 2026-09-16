const PaginationButton = ({
  children,
  onClick,
  active = false,
  disabled = false,
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      className={`page-btn${active ? " active" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
