import { promises as fs } from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true })
}

export async function readData<T>(file: string): Promise<T[]> {
  await ensureDir()
  const filePath = path.join(dataDir, file)
  try {
    const content = await fs.readFile(filePath, 'utf8')
    return JSON.parse(content) as T[]
  } catch {
    return []
  }
}

export async function writeData<T>(file: string, data: T[]): Promise<void> {
  await ensureDir()
  const filePath = path.join(dataDir, file)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}

export async function appendData<T>(file: string, item: T): Promise<void> {
  const data = await readData<T>(file)
  data.push(item)
  await writeData<T>(file, data)
}
