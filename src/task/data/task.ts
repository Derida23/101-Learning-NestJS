export interface Task {
  task_id: number;
  task_name: string;
  task_description: string;
}

export const tasks:Task[] = [
  {
    task_id: 1,
    task_name: "Berangkat",
    task_description: "Berangkat Sekolah",
  },
  {
    task_id: 2,
    task_name: "Pulang",
    task_description: "Pulang Sekolah",
  },
  {
    task_id: 3,
    task_name: "Istirahat",
    task_description: "Istirahat Sekolah",
  }
]