import React, { memo, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

function MarkdownWithLatex({ content }: { content: string }) {
  const preprocessLaTeX = useCallback((content: string) => {
    const blockProcessedContent = content.replace(/\\\[(.*?)\\\]/gs, (_, equation) => `$$${equation}$$`);
    const inlineProcessedContent = blockProcessedContent.replace(/\\\((.*?)\\\)/gs, (_, equation) => `$${equation}$`);
    return inlineProcessedContent;
  }, []);
  const processedContent = preprocessLaTeX(content);

  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {processedContent}
    </ReactMarkdown>
  );
}

export default memo(MarkdownWithLatex);
