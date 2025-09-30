import { extractTextFromImage } from '@/lib/ocr/image';
import { extractTextFromPdf } from '@/lib/ocr/pdf';

export type Task = {
  id: string;
  type: 'image' | 'pdf';
  payload: ArrayBuffer;
  locale?: 'en' | 'de' | 'lt';
};

type WorkerResult = Awaited<ReturnType<typeof extractTextFromImage>> | Awaited<ReturnType<typeof extractTextFromPdf>>;

type QueueItem = {
  task: Task;
  resolve: (value: WorkerResult) => void;
  reject: (reason?: unknown) => void;
};

export class OCRPool {
  private concurrency: number;
  private active = 0;
  private queue: QueueItem[] = [];

  constructor(concurrency = 2) {
    this.concurrency = concurrency;
  }

  submit(task: Task): Promise<WorkerResult> {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.dequeue();
    });
  }

  private dequeue() {
    if (this.active >= this.concurrency) return;
    const item = this.queue.shift();
    if (!item) return;
    this.active += 1;
    const run = item.task.type === 'image' ? extractTextFromImage : extractTextFromPdf;
    run(item.task.payload, item.task.locale ?? 'en')
      .then(item.resolve)
      .catch(item.reject)
      .finally(() => {
        this.active -= 1;
        this.dequeue();
      });
  }
}
