import { renderToString } from 'react-dom/server';
import App from './App';
import { SEO_PAGES } from './seo/pages';
import { APP_CONFIG } from './config';

export function render(url: string): string {
  return renderToString(<App initialPath={url} />);
}

export { SEO_PAGES, APP_CONFIG };

