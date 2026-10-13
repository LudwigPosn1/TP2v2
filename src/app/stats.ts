import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskStore } from './task.store';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './stats.html'
})
export class StatsComponent {
  readonly store = inject(TaskStore);

  // Utilisation des propriétés calculées (computed) basées sur la diapositive 11 du cours
  readonly total = computed(() => this.store.tasks().length);
  
  readonly done = computed(() => 
    this.store.tasks().filter(t => t.done).length
  );
  
  readonly remaining = computed(() => 
    this.total() - this.done()
  );
  
  readonly percent = computed(() => {
    const t = this.total();
    return t === 0 ? 0 : Math.round(100 * this.done() / t);
  });
}