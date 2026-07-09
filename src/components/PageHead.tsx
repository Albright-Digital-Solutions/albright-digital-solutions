import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { canonicalUrl, DEFAULT_IMAGE, getSeoForPath, SITE_NAME } from '../data/seo';

function setMeta(selector: string, attrs: Record<string, string>, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function PageHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(pathname);
    const url = canonicalUrl(seo.path);
    const image = seo.image ?? DEFAULT_IMAGE;

    document.title = seo.title;
    setMeta('meta[name="description"]', { name: 'description' }, seo.description);
    setLink('canonical', url);

    setMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME);
    setMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
    setMeta('meta[property="og:title"]', { property: 'og:title' }, seo.title);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, seo.description);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, url);
    setMeta('meta[property="og:image"]', { property: 'og:image' }, image);

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, seo.description);
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, image);
  }, [pathname]);

  return null;
}
