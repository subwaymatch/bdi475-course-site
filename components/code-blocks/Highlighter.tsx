import React from "react";
import hljs from "highlight.js";
import lodashTrim from "lodash/trim";

interface HighlighterProps {
  content: string;
  language?: string;
  trim?: boolean;
}

export default function Highlighter({
  content,
  language,
  trim = true,
}: HighlighterProps): JSX.Element {
  if (trim) {
    content = lodashTrim(content, "\n");
  }

  const highlighted = language
    ? hljs.highlight(language, content)
    : hljs.highlightAuto(content);

  return (
    <pre className="hljs">
      <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
    </pre>
  );
}
