export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1); // e.g. /images/photo.jpg

    const object = await env.MY_BUCKET.get(key);

    if (!object) return new Response("Not found", { status: 404 });

    const type = object.httpMetadata?.contentType || "application/octet-stream";

    return new Response(object.body, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
};

