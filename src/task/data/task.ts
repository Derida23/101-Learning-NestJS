export interface Task {
  task_name: string;
  task_description: string;
}

export const tasks:Task[] = [
  {
    task_name: "Berangkat",
    task_description: "Berangkat Sekolah",
  },
  {
    task_name: "Pulang",
    task_description: "Pulang Sekolah",
  },
  {
    task_name: "Istirahat",
    task_description: "Istirahat Sekolah",
  }
]