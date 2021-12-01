# TP Testes

### 1 - Nome dos membros do grupo
 - Arthur Herbert Silva Melo
 - Matheus Henrique Antunes Lima
 - Vitor Siman do Amaral Lamartine

### 2 - Explicação do sistema

Desenvolvemos um sistema de todo list, onde o usuário pode criar tarefas com título, descrição, categorias, data de conclusão e subtarefas. O usuário pode também criar listas para agrupar tarefas semelhantes, listas também podem ter título, descrição e data de conclusão.

A ideia é que o usuário possa controlar tarefas do seu dia-a-dia, com bastante flexibilidade e rapidez (O usuário pode usar tarefas muito simples, com apenas um título, ou tarefas mais complexas, com categorias, subtarefas, datas e listas).

### 3 - Explicação das tecnologias

Utilizamos o framework Javascript Nest JS para desenvolver uma API rest onde os usuários podem criar, atualizar e apagar entidades usando requisições HTTP. A ideia é desenvolver o frontend e os testes e2e na segunda parte do trabalho.

Abaixo se encontram as entidades que compõe o sistema

```typescript

// Classe usada para representar os campos usados em todas as entidades 
class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string | null;
}

class Tag extends BaseEntity {
  @Column()
  label: string;

  @Column()
  color: string;

  @ManyToMany(() => Task, (task) => task.tags)
  tasks: Task[];
}

class List extends BaseEntity {
  @Column()
  label: string;

  @Column({ nullable: true, default: null })
  description: string | null;

  @Column('datetime', { nullable: true, default: null })
  dueDate: Date | null;

  @OneToMany(() => Task, (task) => task.list)
  tasks: Task[];
}

class Task extends BaseEntity {
  @Column()
  label: string;

  @Column({ nullable: true, default: null })
  description: string | null;

  @Column('datetime', { nullable: true, default: null })
  dueDate: Date | null;

  @Column('datetime', { nullable: true, default: null })
  completedAt: Date | null;

  @ManyToOne(() => List, (list) => list.tasks)
  list: List | null;

  @OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
  subtasks: Subtask[];

  @ManyToMany(() => Tag, (tag) => tag.tasks, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @Column({
    type: 'simple-enum',
    enum: TaskPriority,
    default: null,
    nullable: true,
  })
  priority: TaskPriority | null;
}

class Subtask extends BaseEntity {
  @Column()
  label: string;

  @Column('datetime', { nullable: true, default: null })
  completedAt: Date | null;

  @ManyToOne(() => Task, (task) => task.subtasks, { nullable: false })
  task: Task;
}
```
