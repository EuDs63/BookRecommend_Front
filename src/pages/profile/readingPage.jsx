import React, { useState, useEffect } from "react";

function ReadingPage({ readingBookData }) {
  return (
    <div>
      <h2>在读书籍</h2>
      <ul>
        {readingBookData ? (
          readingBookData.map((book) => (
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
export default ReadingPage;
