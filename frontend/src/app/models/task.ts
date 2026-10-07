export interface Task {
  id: number;
  title: string;
  description?: string;
  userId?: number;
  completed: boolean;
  createdAt: string;
}

export interface CreateTask {
  title: string;
  description?: string;
  userId?: number;
  completed?: boolean;
}

export type UpdateTask = Partial<CreateTask>;
