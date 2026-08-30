'use server';

import { db, Timestamp } from './firebase';
import { Article } from '@/types/article';

const COLLECTION_NAME = 'articles';

export async function getArticles(publishedOnly = true): Promise<Article[]> {
  try {
    let query: FirebaseFirestore.Query = db.collection(COLLECTION_NAME);
    if (publishedOnly) {
      query = query.where('isPublished', '==', true);
    }

    const snapshot = await query.get();
    const articles = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis() || Date.now(),
        updatedAt: data.updatedAt?.toMillis() || Date.now(),
      } as Article;
    });

    // Sort in memory to avoid Firestore composite index requirement
    return articles.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
    } as Article;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data()!;
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
    } as Article;
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    return null;
  }
}

export async function createArticle(data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = db.collection(COLLECTION_NAME).doc();
    const now = Timestamp.now();
    await docRef.set({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error creating article:', error);
    return { success: false, error: error.message };
  }
}

export async function updateArticle(id: string, data: Partial<Omit<Article, 'id' | 'createdAt' | 'updatedAt'>>) {
  try {
    await db.collection(COLLECTION_NAME).doc(id).update({
      ...data,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error updating article:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(id: string) {
  try {
    await db.collection(COLLECTION_NAME).doc(id).delete();
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return { success: false, error: error.message };
  }
}
