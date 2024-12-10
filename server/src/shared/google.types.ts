export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}

export interface MediaItem {
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

export interface PhotosResponse {
  mediaItems: MediaItem[];
  nextPageToken?: string;
}
