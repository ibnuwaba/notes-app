import type { View } from "../types";

type ViewTabsProps = {
  view: View;
  onViewChange: (view: View) => void;
  counts: {
    all: number;
    pinned: number;
    archived: number;
  };
};

export function ViewTabs({
  view,
  onViewChange,
  counts,
}: ViewTabsProps) {
  const tabs: { value: View; label: string; count: number }[] = [
    { value: "all", label: "All", count: counts.all },
    { value: "pinned", label: "Pinned", count: counts.pinned },
    { value: "archived", label: "Archived", count: counts.archived },
  ];

  return (
    <div
      role="tablist"
      aria-label="Note views"
      className="flex gap-2 border-b"
    >
      {tabs.map((tab) => {
        const isActive = view === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onViewChange(tab.value)}
            className={`border-b-2 px-4 py-2 text-sm font-medium ${
              isActive
                ? "border-current"
                : "border-transparent opacity-60"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        );
      })}
    </div>
  );
}