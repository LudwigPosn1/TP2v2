import { Routes, RouterLink } from '@angular/router'; // Ajoute RouterLink ici
import { TaskForm } from './task-form';
import { TaskList } from './task-list';
import { StatsComponent } from './stats';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [TaskForm, TaskList, RouterLink], // Ajoute RouterLink pour le bouton /stats
  template: `
    <nav>
      <a routerLink="/stats">Voir les statistiques 📊</a>
    </nav>
    <app-task-form />
    <app-task-list />
  `
})
class HomeView {}

export const routes: Routes = [
  { path: '', component: HomeView },          // Route racine[cite: 50]
  { path: 'stats', component: StatsComponent }, // Route /stats[cite: 50]
  { path: '**', redirectTo: '' }
];