import React from "react";
import hljs from "highlight.js";
import _ from "lodash";

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
    content = _.trim(content, "\n");
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
