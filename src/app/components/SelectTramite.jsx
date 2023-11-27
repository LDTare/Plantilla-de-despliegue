import { useState, useEffect } from "react";

function SelectTramite({ handleChange}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/tramite", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <select className="border rounded-lg border-gray-400 px-3 py-2 mb-4 w-full text-black"  name="Correlativo" onChange={handleChange} data-te-select-init>
        <option value="">Seleccionar trámite</option>
        {data.map((item) => (
          <option key={item.id} value={item.correlativo}>
            {item.correlativo}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectTramite;
