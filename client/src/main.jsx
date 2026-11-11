import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { InitialDataProvider } from './context/InitialData.jsx';
import App from './App.jsx';
import './styles/global.css';
import { initAnalytics } from './components/seo.js';

initAnalytics();

// Google Translate wraps text nodes in <font> tags, which makes React's DOM
// updates throw ("removeChild ... not a child"). Make those calls forgiving.
if (typeof Node === 'function' && Node.prototype) {
  const origRemove = Node.prototype.removeChild;
  Node.prototype.removeChild = function removeChild(child) {
    if (child.parentNode !== this) return child;
    return origRemove.call(this, child);
  };
  const origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function insertBefore(node, ref) {
    if (ref && ref.parentNode !== this) return origInsert.call(this, node, null);
    return origInsert.call(this, node, ref);
  };
}

// The server already put the page's HTML in #root (for search engines). The browser app renders
// fresh over it rather than hydrating, because language, currency and cart come from the browser.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <InitialDataProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </InitialDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
