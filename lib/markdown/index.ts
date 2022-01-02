import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export function parseMarkdown(markdownText: string): string {
  try {
    const processedVFile = unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeKatex)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .processSync(markdownText);

    return String(processedVFile);
  } catch (error) {
    console.error(error);
    return null;
  }
}
