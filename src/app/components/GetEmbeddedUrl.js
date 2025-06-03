import { headers } from 'next/headers';

async function getEmbeddedUrl(canvasId, userIdentifier, requiredFilters) {
  const DEF_API_KEY = process.env.DEF_API_KEY;

  if (!DEF_API_KEY) {
    throw new Error('DEFINITE_API_KEY is not set in environment variables');
  }

  const embed_options = {
    user_identifier: userIdentifier,
    canvas_id: canvasId,
    required_filters: requiredFilters,
    embed_type: "dashboard"
  };

  // Use local URL if USE_LOCAL_API environment variable is set, otherwise use staging
  const baseUrl = process.env.USE_LOCAL_API === 'true' 
    ? 'http://localhost:8001' 
    : 'https://staging-def-py-backend-rn5klrouba-uc.a.run.app';

  const response = await fetch(`${baseUrl}/v1/get_embedded_url`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${DEF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(embed_options),
    // cache: 'no-store'
  });

  console.log("FIND ME ", baseUrl);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('API Response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorBody
    });
    throw new Error(`Failed to fetch embedded URL: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();

  console.log("FIND ME ", data);
  let embeddedUrl = data.url;
  embeddedUrl = embeddedUrl.replace('/canvas/', '/dashboard/');
  return embeddedUrl;
}

export default async function GetEmbeddedUrl({ canvasId, userIdentifier, requiredFilters }) {
  const embeddedUrl = await getEmbeddedUrl(canvasId, userIdentifier, requiredFilters);
  return { embeddedUrl };
}