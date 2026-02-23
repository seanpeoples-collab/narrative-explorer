import { narratives } from '../data/narratives';

export function NarrativeComparison() {
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden overflow-x-auto">
      <table className="w-full min-w-[800px] text-left border-collapse">
        <thead>
          <tr className="bg-stone-50 border-b border-stone-200">
            <th className="p-4 font-serif text-base font-medium text-stone-500 w-48 sticky left-0 bg-stone-50 z-10 border-r border-stone-200">Feature</th>
            {narratives.map(n => (
              <th key={n.id} className="p-4 font-serif text-base font-bold text-[#1C1917] min-w-[200px] border-r border-stone-100 last:border-0">
                {n.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Row label="Protagonist" field="protagonist" />
          <Row label="Structure" field="structure" />
          <Row label="Goal" field="goal" />
          <Row label="Vibe" field="vibe" />
          <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
            <td className="p-4 font-medium text-stone-500 sticky left-0 bg-white z-10 border-r border-stone-200 text-sm">Origin</td>
            {narratives.map(n => (
              <td key={n.id} className="p-4 text-stone-600 text-sm border-r border-stone-100 last:border-0">
                {n.origin}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Row({ label, field }: { label: string, field: keyof typeof narratives[0]['keyTraits'] }) {
  return (
    <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
      <td className="p-4 font-medium text-stone-500 sticky left-0 bg-white z-10 border-r border-stone-200 text-sm">{label}</td>
      {narratives.map(n => (
        <td key={n.id} className="p-4 text-stone-700 text-sm border-r border-stone-100 last:border-0">
          {n.keyTraits[field]}
        </td>
      ))}
    </tr>
  );
}
