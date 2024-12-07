import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export async function getPlaceDetails(placeId: string) {
  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        key: process.env.GOOGLE_MAPS_API_KEY as string,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
}
