import React from "react";
//
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeHighlighter = () => {
  const codeString = `const cttn = require('cttn')('sk_test_BQoikJ')
await cttn.centre.create({
    name: "Example centre name",
    proce: '200',
    isPrivate: true,
    description: "Centre example description"
});

const exam = cttn.exam.create({
    title: "Exam title",
})`;
  return (
    <SyntaxHighlighter
      language="javascript"
      style={a11yDark}
      lineProps={{
        style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
      }}
      showLineNumbers={true}
      wrapLines={true}
    >
      {codeString}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;
