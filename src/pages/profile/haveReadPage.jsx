import React, { useState, useEffect } from "react";

function HaveReadPage({ haveReadBookData }) {
  return (
    <div>
      <h2>读过书籍</h2>
      <ul>
        {haveReadBookData ? (
          haveReadBookData.map((book) => (
            <li key={book.book_id}>
              <div>书名: {book.title}</div>
              <div>作者: {book.author}</div>
              {/* 其他书籍信息 */}
            </li>
          ))
        ) : (
          <p>加载中...</p>
        )}
      </ul>
    </div>
  );
}
export default HaveReadPage;
