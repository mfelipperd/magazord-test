import { useState } from "react";

interface FilterProps {
  onFilterChange: (filter: { language?: string; type?: string }) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [language, setLanguage] = useState("");
  const [type, setType] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({ language, type });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Filtros</h2>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="block w-full p-2 border rounded-md mb-2"
      >
        <option value="">Linguagem</option>
        <option value="JavaScript">JavaScript</option>
        <option value="TypeScript">TypeScript</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="block w-full p-2 border rounded-md mb-2"
      >
        <option value="">Tipo</option>
        <option value="forks">Forks</option>
        <option value="sources">Sources</option>
      </select>
      <button
        onClick={handleApplyFilters}
        className="bg-blue-500 text-white w-full p-2 rounded-md"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}
