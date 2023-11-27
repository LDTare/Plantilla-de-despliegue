import { useState, useEffect } from "react";

function SelectActividad({ handleChange }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/actividad", {
        method: "GET", // or 'PUT'
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <select className="border rounded-lg border-gray-400 px-3 py-2 mb-4 w-full text-black" name="actividad_id" onChange={handleChange} data-te-select-init>
        <option value=""> Seleccionar Actividad</option>
        {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.Nombre}
            </option>
          ))}
      </select>
    </div>
  );
}
export default SelectActividad;
