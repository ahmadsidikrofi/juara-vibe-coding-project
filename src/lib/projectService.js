import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Menyimpan data proyek (hasil diagnosis AI) ke koleksi 'projects' di Firestore.
 * 
 * @param {string} userId - ID unik pengguna
 * @param {string} imageUrl - URL dari gambar baju
 * @param {Object} diagnosisResult - Objek JSON hasil analisis Gemini
 * @param {string} uniqueId - ID unik proyek (misal: #PRMK-12345)
 * @returns {Promise<string>} ID dokumen yang berhasil dibuat
 */
export async function saveProject(userId, imageUrl, diagnosisResult, uniqueId) {
  try {
    const projectsRef = collection(db, 'projects');
    
    const docRef = await addDoc(projectsRef, {
      userId: userId,
      imageUrl: imageUrl,
      diagnosis: diagnosisResult,
      projectId: uniqueId,
      status: 'saved',
      createdAt: serverTimestamp(),
    });
    
    console.log("Project berhasil disimpan dengan ID: ", docRef.id);
    return docRef.id;
    
  } catch (error) {
    console.error("Error saat menyimpan project ke Firestore: ", error);
    throw new Error("Gagal menyimpan project ke database. Silakan coba lagi nanti.");
  }
}
