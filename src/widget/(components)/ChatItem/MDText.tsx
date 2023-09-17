import { marked } from "marked";
import { styled } from "styled-components";

export default function MDText({ text }: { text: string }) {
  return (
    <ParseToHtml
      dangerouslySetInnerHTML={{
        __html: marked.parse(text, {
          breaks: true,
        }),
      }}
    />
  );
}

const ParseToHtml = styled.span`
  * {
    /* font-weight: normal; */
  }

  h1 {
    font-size: 36px;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 20px;
  }
  h5 {
    font-size: 18px;
  }
  h6 {
    font-size: 16px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    padding: 5px 0;
    font-size: 14px;
    /* line-height: normal; */
  }
  .parse-to-html {
    white-space: pre-line;
  }
  /* ============= table style =================== */
  table {
    border-collapse: collapse;
    /* border: 1px solid #ddd; */
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    padding: 3px 0;
    ::-webkit-scrollbar {
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: #ccc8c8;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #777;
    }
    thead {
      background-color: rgb(255, 255, 255, 0.2);
    }
    th,
    td {
      border: 1px solid #ddd;
      padding: 4px;
      white-space: pre-wrap;
      font-size: 13px;
    }
    th {
      font-weight: bold;
    }
  }

  /* =============== pre and code tag style ============= */
  pre {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    line-height: 1.2;
  }
  code {
    white-space: normal;
  }

  /* ============= list style =================== */
  ul {
    list-style-type: disc;
    padding-inline-start: 20px;
    list-style-type: disc;
    li {
      padding: 3px 0;
    }
  }

  ol {
    list-style-type: decimal;
  }

  /* ========================================== */
  blockquote p {
    border-left: 3px solid rgb(160, 170, 191);
    padding-left: 10px;
    margin: 5px 0;
  }
`;
