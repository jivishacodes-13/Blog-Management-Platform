const KEYS = { blogs:'inkwell_blogs', bookmarks:'inkwell_bookmarks', liked:'inkwell_liked', theme:'inkwell_theme' };
export function getBlogs(){ try { const v=localStorage.getItem(KEYS.blogs); return v ? JSON.parse(v) : null; } catch { return null; } }
export function saveBlogs(blogs){ localStorage.setItem(KEYS.blogs, JSON.stringify(blogs)); }
export function getSet(key){ try { return new Set(JSON.parse(localStorage.getItem(KEYS[key]) || '[]')); } catch { return new Set(); } }
export function saveSet(key,set){ localStorage.setItem(KEYS[key], JSON.stringify([...set])); }
export { KEYS };
