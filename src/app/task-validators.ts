import {ValidatorFn} from '@angular/forms'; // Importation du type ValidatorFn depuis le module Angular forms


export const titleMin3: ValidatorFn = control => {
    const value = String(control.value ?? '').trim(); // Récupère la valeur du contrôle et la convertit en chaîne de caractères, en supprimant les espaces
    return value.length >= 3 ? null : { titleMin3: true }; // Vérifie si la longueur de la valeur est d'au moins 3 caractères, sinon retourne une erreur
};

const pad = (num: number) => String(num).padStart(2, '0'); // Fonction utilitaire pour ajouter un zéro devant les nombres inférieurs à 10
const todayLocal = () => {
    const d = new Date(); // Crée un nouvel objet Date représentant la date et l'heure actuelles
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // Formate la date au format YYYY-MM-DD
};

export const validDueDate: ValidatorFn = control => {
    const value = String(control.value ?? '').trim(); // Récupère la valeur du contrôle et la convertit en chaîne de caractères, en supprimant les espaces
    if (!value) return null; // Champ vide = OK car optionnel

    // Vérifie si la valeur correspond au format YYYY-MM-DD, sinon retourne une erreur
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) 
        return { validDueDate: true 
    };

    const d = new Date(value + 'T00:00:00'); // Crée un nouvel objet Date à partir de la valeur du contrôle
    const valid = !Number.isNaN(d.getTime())
        && d.getFullYear() === Number(value.slice(0, 4))
        && d.getMonth() + 1 === Number(value.slice(5, 7))
        && d.getDate() === Number(value.slice(8, 10)); // Vérifie si la date est valide en comparant les composants de la date
    
    return valid && value >= todayLocal() ? null : { validDueDate: true }; // Vérifie si la date est valide et si elle est supérieure ou égale à la date actuelle, sinon retourne une erreur
}