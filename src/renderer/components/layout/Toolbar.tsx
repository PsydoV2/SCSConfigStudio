import { CATEGORIES } from "../../../constants/parameters";
import type { CategoryId } from "../../../shared/types";
import { IconSearch, IconX } from "../ui/Icons";

interface ToolbarProps {
  activeCategory: CategoryId;
  searchQuery: string;
  paramCount: number;
  disabled?: boolean;
  onSearchChange: (q: string) => void;
}

export function Toolbar({
  activeCategory,
  searchQuery,
  paramCount,
  disabled = false,
  onSearchChange,
}: ToolbarProps) {
  const categoryLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "";

  return (
    <div className="toolbar">
      <div className="toolbar__left">
        <h1 className="toolbar__title">
          {searchQuery ? `"${searchQuery}"` : categoryLabel}
        </h1>
        {!disabled && (
          <span className="toolbar__count">
            {paramCount} parameter{paramCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="toolbar__right">
        {!disabled && (
          <div className="search">
            <span className="search__icon" aria-hidden="true">
              <IconSearch size={14} />
            </span>
            <input
              className="search__input"
              type="search"
              placeholder="Search parameters…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search parameters"
            />
            {searchQuery && (
              <button
                className="search__clear"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <IconX size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
