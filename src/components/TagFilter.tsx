import '../styles/TagFilter.css';

interface TagFilterProps {
  tags: string[];
  selectedTags: Set<string>;
  onTagChange: (tag: string) => void;
  onClear: () => void;
}

/**
 * TagFilter
 * タグフィルタコンポーネント
 * 利用可能なタグを表示して、選択可能にします
 */
export function TagFilter({ tags, selectedTags, onTagChange, onClear }: TagFilterProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <div className="tag-filter-header">
        <h3>タグで絞り込み</h3>
        {selectedTags.size > 0 && (
          <button className="clear-button" onClick={onClear}>
            クリア
          </button>
        )}
      </div>
      <div className="tag-filter-tags">
        {tags.map(tag => (
          <button
            key={tag}
            className={`filter-tag ${selectedTags.has(tag) ? 'active' : ''}`}
            onClick={() => onTagChange(tag)}
          >
            {tag}
            {selectedTags.has(tag) && <span className="check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
