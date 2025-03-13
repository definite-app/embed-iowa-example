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

  const response = await fetch('https://staging-def-py-backend-rn5klrouba-uc.a.run.app/v1/get_embedded_url', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${DEF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(embed_options),
    // cache: 'no-store'
  });

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
  let embeddedUrl = data.url;
  embeddedUrl = embeddedUrl.replace('/canvas/', '/dashboard/');
  return embeddedUrl;
}

export default async function GetEmbeddedUrl({ canvasId, userIdentifier, requiredFilters }) {
  const embeddedUrl = await getEmbeddedUrl(canvasId, userIdentifier, requiredFilters);
  return { embeddedUrl };
}