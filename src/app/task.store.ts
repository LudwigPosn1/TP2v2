import { Injectable, signal, effect } from '@angular/core'; // Importation des décorateurs et fonctions nécessaires depuis le module Angular core
import { Task } from './task';  // Importation de l'interface Task depuis le fichier task.ts

@Injectable({
    providedIn: 'root' // Rend le store accessible partout dans l'application
})

export class TaskStore {
    private storageKey = 'tasks'; // Clé utilisée pour stocker les tâches dans le localStorage

    // Fonction de lecture sécurisée du localStorage
    private load(): Task[] {
        if (typeof window === 'undefined') return []; // Vérifie si l'environnement est un navigateur
        try {
            const data = localStorage.getItem(this.storageKey); // Récupère les données du localStorage
            return data ? JSON.parse(data) : []; // Parse les données JSON ou retourne un tableau vide si aucune donnée
        } catch (error) {
            console.error('Erreur lors du chargement des tâches depuis le localStorage:', error);
            return [];
        }
    }

    // Etat privé réactif basé sur un Signal, initialisé avec le localStorage
    private readonly state = signal<Task[]>(this.load());

    readonly tasks = this.state.asReadonly(); // Expose l'état des tâches en lecture seule

    //Synchronisation automatique du localStorage avec l'état des tâches
    constructor() {
        effect(() => {
            const currentTasks = this.state(); // Récupère l'état actuel des tâches
            if (typeof window === 'undefined') return;
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(currentTasks)); // Stocke les tâches dans le localStorage
            } catch {
                console.error('Sauvegarde locale impossible.'); // Gestion des erreurs de sauvegarde
            }
        });
    }



    //Fonction pour ajouter une tâche
    add(data: { title: string; description?: string; dueDate?: string; }) {
        const now = new Date().toISOString(); // Obtient la date et l'heure actuelles au format ISO
        const newTask: Task = {
            ...data, // Déstructure les données passées en paramètre
            id: crypto.randomUUID(), // Génère un identifiant unique pour la tâche
            done: false, // Initialise la tâche comme non terminée
            createdAt: now, // Définit la date de création
            updatedAt: now // Définit la date de mise à jour
        };
        this.state.update(tasks => [...tasks, newTask]); // Met à jour l'état en ajoutant la nouvelle tâche
    }

    // Fonction pour cocher ou décocher une tâche
    toggle (id: string) {
        this.state.update(tasks =>
            tasks.map(task =>
                task.id === id
                    ? { ...task, done: !task.done, updatedAt: new Date().toISOString() } // Inverse l'état de la tâche et met à jour la date
                    : task
            )
        );
    }

    // Fonction pour supprimer une tâche
    remove (id: string) {
        this.state.update(tasks => tasks.filter(task => task.id !== id)); // Filtre les tâches pour exclure celle avec l'ID donné
    }
}