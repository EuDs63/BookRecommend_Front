import React, { useState, useEffect } from "react";

function WillReadPage({ willReadBookData }) {
  return (
    <div>
      <h2>想读书籍</h2>
      <ul>
        {willReadBookData ? (
          willReadBookData.map((book) => (
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
export default WillReadPage;
