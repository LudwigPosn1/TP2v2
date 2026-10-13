import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskStore } from './task.store';
import { titleMin3, validDueDate } from './task-validators';

@Component({
    selector: 'app-task-form',
    standalone: true, 
    imports: [ReactiveFormsModule], // Premet d'utiliser [formGroup] en HTML
    templateUrl: './task-form.html',
})

export class TaskForm {
    readonly store = inject(TaskStore); // Injection du service TaskStore pour gérer les tâches

    readonly form = new FormGroup({
        title: new FormControl('', { nonNullable: true, validators: [titleMin3] }), // Champ titre avec validation de longueur minimale
        description: new FormControl(''), // Champ description sans validation
        dueDate: new FormControl('', { validators: [validDueDate] }), // Champ date d'échéance avec validation de format et de date
    });

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched(); // Marque tous les champs comme touchés pour afficher les messages d'erreur
            return;
        }
    

    const value = this.form.getRawValue(); // Récupère les valeurs du formulaire

    this.store.add({
        title: value.title.trim(), // Ajoute le titre de la tâche
        description: value.description?.trim() || undefined, // Ajoute la description de la tâche si elle n'est pas vide
        dueDate: value.dueDate || undefined, // Ajoute la date d'échéance de la tâche si elle n'est pas vide
    });

    this.form.reset(); // Réinitialise le formulaire après l'ajout de la tâche
}
}