import { createWorker, PSM } from 'tesseract.js';
import type { Worker } from 'tesseract.js';

type WorkerWrapper = {
  busy: boolean;
  worker: Worker;
};

const pool: WorkerWrapper[] = [];
const MAX_WORKERS = 2;

const initWorker = async () => {
  const worker = await createWorker({
    logger: () => undefined,
  });
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.AUTO,
  });
  return worker;
};

const getWorker = async (): Promise<WorkerWrapper> => {
  const idle = pool.find((item) => !item.busy);
  if (idle) {
    idle.busy = true;
    return idle;
  }
  if (pool.length < MAX_WORKERS) {
    const worker = await initWorker();
    const wrapper: WorkerWrapper = { busy: true, worker };
    pool.push(wrapper);
    return wrapper;
  }
  await new Promise((resolve) => setTimeout(resolve, 50));
  return getWorker();
};

export const recognize = async (imageData: ImageData | HTMLCanvasElement, languages: string[] = ['eng']) => {
  const wrapper = await getWorker();
  try {
    for (const lang of languages) {
      await wrapper.worker.loadLanguage(lang);
    }
    await wrapper.worker.initialize(languages.join('+'));
    const { data } = await wrapper.worker.recognize(imageData);
    return data.text;
  } finally {
    wrapper.busy = false;
  }
};
