import { useEffect, useState } from 'react';
import type { Task } from '../types/Types';
import type { Project } from '../types/Project';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import { TaskForm } from '../components/TaskForm';
import { TaskBoard } from '../components/TaskBoard';

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    const load = async () => {
        const [taskData, projectData] = await Promise.all([
            taskService.getAll(),
            projectService.getAll(),
        ]);
        setTasks(taskData);
        setProjects(projectData);
    };

    const handleCreate = async (data: Omit<Task, 'id' | 'createdAt'>) => {
        await taskService.create(data);
        await load();
    };


    const handleMove = async (id: string, status: Task['status']) => {
        await taskService.update(id, { status });
        await load();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Remover esta tarefa?')) {
            await taskService.delete(id);
            await load();
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Tarefas</h1>
            <TaskForm onCreate={handleCreate} projects={projects} />
            <TaskBoard tasks={tasks} onMove={handleMove} onDelete={handleDelete} />
        </div>
    );
}
