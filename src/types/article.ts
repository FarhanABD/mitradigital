export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl: string;
  seoKeywords: string;
  seoDescription: string;
  isPublished: boolean;
  createdAt: any; // Allow for Firebase Timestamp or standard Date/string
  updatedAt: any;
}
