import { faker } from '@faker-js/faker';

// Fungsi untuk menghasilkan data pengguna
export function generateUserData() {
    return {
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        username: faker.internet.username(),
        employeeId: faker.string.numeric(5),

    };
}

export function generatePassword(length = 12) {
    if (length < 4) {
        throw new Error("Password length must be at least 4 to include all character types.");
    }

    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = lowerCaseChars + upperCaseChars + numberChars + specialChars;

    // Pastikan password memiliki setidaknya satu karakter dari setiap kategori
    const passwordArray = [
        lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)],
        upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)],
        numberChars[Math.floor(Math.random() * numberChars.length)],
        specialChars[Math.floor(Math.random() * specialChars.length)],
    ];

    // Tambahkan sisa karakter secara acak
    for (let i = passwordArray.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        passwordArray.push(allChars[randomIndex]);
    }

    // Acak urutan karakter untuk membuat password lebih aman
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[randomIndex]] = [passwordArray[randomIndex], passwordArray[i]];
    }

    return passwordArray.join('');
}

