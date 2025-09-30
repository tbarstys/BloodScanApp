export type Task<T> = () => Promise<T>;

export class WorkerPool {
  private queue: Task<unknown>[] = [];
  private active = 0;

  constructor(private readonly concurrency = 2) {}

  enqueue<T>(task: Task<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const wrapped = async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.active -= 1;
          this.dequeue();
        }
      };
      this.queue.push(wrapped);
      this.dequeue();
    });
  }

  private dequeue() {
    if (!this.queue.length || this.active >= this.concurrency) return;
    const task = this.queue.shift();
    if (!task) return;
    this.active += 1;
    void task();
  }
}
