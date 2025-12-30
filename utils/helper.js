import fs from 'fs';
import path from 'path';

// Fungsi untuk menyimpan variabel ke dalam localStorage dan file
export async function saveToLocalStorageAndFile(page, { key, value }) {
    // Simpan nilai ke dalam localStorage menggunakan key yang diberikan
    await page.evaluate(({ key, value }) => {
        localStorage.setItem(key, value);
    }, { key, value });

    // Mengambil nilai dari localStorage
    const storedValue = await page.evaluate((key) => localStorage.getItem(key), key);

    // Verifikasi bahwa nilai yang diambil dari localStorage cocok dengan yang disimpan
    if (storedValue !== value) {
        throw new Error(`Value for key "${key}" does not match the stored value.`);
    }

    // Tentukan path file untuk menyimpan nilai
    const filePath = path.join(__dirname, '../local-storage', `${key}.txt`);

    // Menyimpan nilai ke dalam file
    fs.writeFileSync(filePath, storedValue, 'utf8');

    console.log(`Value for key "${key}" saved to file at ${filePath}`);
}
export function readValueFromFile(key) {
    const filePath = path.join(__dirname, '../local-storage', `${key}.txt`);
    if (!fs.existsSync(filePath)) {
        throw new Error(`File for key "${key}" does not exist at ${filePath}`);
    }
    const value = fs.readFileSync(filePath, 'utf8');
    return value.trim(); // Menghapus spasi atau newline jika ada
}




