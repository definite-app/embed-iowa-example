import GetEmbeddedUrl from '../components/GetEmbeddedUrl';
import DefiniteEmbedLink from '../components/DefiniteEmbedLink';
import crypto from 'crypto';

export const fetchCache = 'force-no-store';

export default async function Dashboard() {
  const canvasId = '0b99601e-8401-4113-bcb8-8488c0e28bcf';
  // Generate a random 16-byte (128-bit) user identifier
  const userIdentifier = crypto.randomBytes(16).toString('hex');
  const requiredFilters = [
    {
      member: "iowa_sales.store_number",
      values: ["2633"],  // Convert to string as the API might expect string values
      operator: "equals",
      type: "string"  // Adding type information
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