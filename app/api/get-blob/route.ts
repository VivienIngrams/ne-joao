import { list } from '@vercel/blob';

export async function GET(request: Request) {
  try {
    const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN });
    const filteredBlobs = blobs.filter(blob => blob.pathname.endsWith('.mp4') || blob.pathname.endsWith('.mov'))
      .map(blob => ({
        src: blob.downloadUrl,
        poster: `${blob.downloadUrl.split('.').slice(0, -1).join('.')}.jpg`, // Assuming a similar structure for posters
        title: blob.pathname.split('/').pop(),
      }));
    return new Response(JSON.stringify(filteredBlobs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch blobs.' }), { status: 500 });
  }
}
