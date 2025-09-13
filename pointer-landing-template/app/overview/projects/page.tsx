import { readData } from '@/lib/fs-db'
import { Project } from '@/lib/types'

export default async function ProjectsPage() {
  const projects = await readData<Project>('projects.json')
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">Type</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="border-t border-[#1F1F23]">
                <td className="px-2 py-1">{p.name}</td>
                <td className="px-2 py-1">{p.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
