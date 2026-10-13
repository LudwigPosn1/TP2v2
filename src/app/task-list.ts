import { Component, inject, signal, computed } from '@angular/core';
import { TaskStore } from './task.store';

@Component({
    selector: 'app-task-list',
    standalone: true,
    templateUrl: './task-list.html',
})
export class TaskList {
    readonly store = inject(TaskStore); // Injection du service TaskStore pour gérer les tâches

    readonly status = signal<'all' | 'done' | 'todo'>('all'); // Signal pour suivre le statut actuel des tâches à afficher
    readonly query = signal(''); // Signal pour suivre la requête de recherche

    readonly visible = computed(() => {
        const currentStatus = this.status(); // Récupère le statut actuel
        const q = this.query().trim().toLocaleLowerCase(); // Récupère la requête de recherche en minuscules et sans espaces

        return this.store.tasks()
            .filter(task => {
                // Filtrage par statut
                const matchesStatus = 
                    currentStatus === 'all' ||
                    (currentStatus === 'done' ? task.done : !task.done);

                // Filtrage par requête de recherche
                const matchesQuery  = task.title.toLocaleLowerCase().includes(q);

                return matchesStatus && matchesQuery; // Retourne true si la tâche correspond aux deux filtres
            })
            .sort((a, b) => {
                const dateA = a.dueDate ?? '9999-12-31'; // Si la tâche n'a pas de date d'échéance, on lui attribue une date très éloignée dans le futur
                const dateB = b.dueDate ?? '9999-12-31'; // Si la tâche n'a pas de date d'échéance, on lui attribue une date très éloignée dans le futur

                return dateA.localeCompare(dateB) || a.title.localeCompare(b.title); // Trie les tâches par date d'échéance croissante
            })
    });
}