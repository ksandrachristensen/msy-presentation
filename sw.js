/* Force attachment download for PDFs in /public */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/public/') && url.pathname.endsWith('.pdf')) {
    event.respondWith((async () => {
      const orig = await fetch(event.request);
      if (!orig.ok) return orig;
      const blob = await orig.blob();
      return new Response(blob, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="' + url.pathname.split('/').pop() + '"',
          'Cache-Control': 'public, max-age=604800'
        }
      });
    })());
  }
});