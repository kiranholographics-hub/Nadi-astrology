// Server-side render of the public site, so search engines get the page text in the
// first HTML response (the browser app then takes over). Built with `vite build --ssr`.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppProvider } from './context/AppContext.jsx';
import { InitialDataProvider } from './context/InitialData.jsx';
import App from './App.jsx';
import { langOfPath } from './components/lang.js';

export function render(url, data = {}) {
  const lang = langOfPath(url.split('?')[0]);
  return renderToString(
    <StaticRouter location={url}>
      <InitialDataProvider data={data}>
        <AppProvider initialLang={lang}>
          <App />
        </AppProvider>
      </InitialDataProvider>
    </StaticRouter>
  );
}
