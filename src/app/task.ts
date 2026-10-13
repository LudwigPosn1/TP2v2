// Ce fichier contient l'interface Task qui définit la structure d'une tâche dans l'application.
export interface Task {
    id: string;  
    title: string;
    description?: string;
    dueDate?: string;
    done: boolean;
    createdAt: string;
    updatedAt: string; 
}