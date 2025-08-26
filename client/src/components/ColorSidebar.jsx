export default function ColorSidebar({ colorKey, onCreate }) {
    return (
      <aside className="sidebar-left">
        <div className="sidebar-inner">
          {colorKey.map(p => (
            <button
              key={p.key}
              title={`New ${p.key} note`}
              className="color-button"
              style={{ background: p.bg }}
              onClick={() => onCreate(p.key)}
            >＋</button>
          ))}
        </div>
      </aside>
    );
  }