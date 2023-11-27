import { useState, useEffect } from "react";

function SelectRol({ handleChange}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/rol", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <select className="border rounded-lg border-gray-400 p-2 mb-4 w-full text-black"  name="rol_id" onChange={handleChange} data-te-select-init>
        <option value="">Seleccionar Rol</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectRol;
