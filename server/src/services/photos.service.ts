import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

interface MediaItem {
  id: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata: {
    creationTime: string;
    width: string;
    height: string;
  };
  filename: string;
}

interface PhotosResponse {
  mediaItems: MediaItem[];
  nextPageToken?: string;
}

export async function listPhotos(auth: OAuth2Client) {
  try {
    const accessToken = (await auth.getAccessToken()).token;

    const response = await axios.get<PhotosResponse>(
      'https://photoslibrary.googleapis.com/v1/mediaItems',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          pageSize: 10,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}
