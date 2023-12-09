export type Todo = {
    id: number;
    description?: string;
    completed?: 1 | 0;
  };
  
export type Action = {
    type: string;
    payload?: Todo | Todo[];
  };
  
export type TodoState = {
    todos: Todo[] | [];
};

