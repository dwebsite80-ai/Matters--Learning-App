import React from 'react';

interface TiaMarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Custom High-Fidelity Markdown Renderer for Tia AI Assistant.
 * Renders bold, italics, bullets, numbered lists, and headers cleanly.
 * Strictly prevents raw markdown symbols like **GDP** or ### from displaying as literal characters.
 */
export const TiaMarkdownRenderer: React.FC<TiaMarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  if (!content) return null;

  // Split into block sections by double newlines or single newlines with list items
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'ul') {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="my-1.5 space-y-1 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-amber-600 font-bold select-none leading-relaxed">•</span>
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="my-1.5 space-y-1 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="font-mono text-xs font-bold text-gray-500 select-none pt-0.5 min-w-4">
                {i + 1}.
              </span>
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();

    if (!rawLine) {
      flushList();
      continue;
    }

    // Check for unordered list item (- , * , • )
    const ulMatch = rawLine.match(/^[-*•]\s+(.*)$/);
    if (ulMatch) {
      if (currentList && currentList.type !== 'ul') {
        flushList();
      }
      if (!currentList) {
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Check for numbered list item (1. , 2. )
    const olMatch = rawLine.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (currentList && currentList.type !== 'ol') {
        flushList();
      }
      if (!currentList) {
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[1]);
      continue;
    }

    // Not a list item
    flushList();

    // Check for headers (### or ## or #)
    const headerMatch = rawLine.match(/^(#{1,4})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      blocks.push(
        <div
          key={`header-${blocks.length}`}
          className={`font-semibold text-[#1A1A1A] mt-2 mb-1 ${
            level === 1
              ? 'text-base font-bold'
              : level === 2
              ? 'text-sm font-bold'
              : 'text-xs font-semibold uppercase tracking-wider text-gray-700'
          }`}
        >
          {renderInline(text)}
        </div>
      );
      continue;
    }

    // Standard paragraph
    blocks.push(
      <p key={`p-${blocks.length}`} className="leading-relaxed mb-2 last:mb-0">
        {renderInline(rawLine)}
      </p>
    );
  }

  flushList();

  return <div className={`tia-formatted-content text-xs sm:text-sm ${className}`}>{blocks}</div>;
};

/**
 * Parses inline formatting: **bold**, *italic*, and `code`
 */
function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Regex tokenizing:
  // 1: `code`
  // 2: **bold**
  // 3: *italic* or _italic_
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={`code-${match.index}`}
          className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[11px] text-amber-900 border border-black/5"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={`b-${match.index}`} className="font-semibold text-[#1A1A1A]">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (
      (token.startsWith('*') && token.endsWith('*')) ||
      (token.startsWith('_') && token.endsWith('_'))
    ) {
      parts.push(
        <em key={`i-${match.index}`} className="italic text-gray-800">
          {token.slice(1, -1)}
        </em>
      );
    } else {
      parts.push(token);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}
