import GetEmbeddedUrl from '../components/GetEmbeddedUrl';
import DefiniteEmbedLink from '../components/DefiniteEmbedLink';
import crypto from 'crypto';

export default async function Dashboard() {
  const canvasId = '0b99601e-8401-4113-bcb8-8488c0e28bcf';
  // Generate a random 16-byte (128-bit) user identifier
  const userIdentifier = crypto.randomBytes(16).toString('hex');
  const requiredFilters = [
    {
      member: "iowa_sales.store_number",
      values: [2633], // 2633, 4829, 2512
      operator: "equals"
    }
  ];

  const { embeddedUrl } = await GetEmbeddedUrl({ canvasId, userIdentifier, requiredFilters });

  return (
    <div>
      <div>URL: {embeddedUrl}</div>
      <DefiniteEmbedLink embeddedUrl={embeddedUrl} />
    </div>
  );
}