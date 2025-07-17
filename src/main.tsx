import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename='/Blog'>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} /> {/* ← 여기에 삽입 */}
    </QueryClientProvider>
  </React.StrictMode>
);
