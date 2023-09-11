import React, { createContext, useContext, useReducer } from 'react';

// 定义初始状态
const initialState = {
  searchHistory: [],
};

// 创建 Context
const SearchHistoryContext = createContext();

// 创建 Reducer 函数
function searchHistoryReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_SEARCH_HISTORY':
      return { ...state, searchHistory: [...state.searchHistory, action.payload] };
    case 'CLEAR_SEARCH_HISTORY':
      return { ...state, searchHistory: [] };
    default:
      return state;
  }
}

// 创建 Context Provider 组件
export function SearchHistoryProvider({ children }) {
  const [state, dispatch] = useReducer(searchHistoryReducer, initialState);

  const addToHistory = (value) => {
    dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: value });
  };

  const clearHistory = () => {
    dispatch({ type: 'CLEAR_SEARCH_HISTORY' });
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory: state.searchHistory, addToHistory, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

// 自定义 Hook 用于访问 Context
export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
}
