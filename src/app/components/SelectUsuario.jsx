import { useState, useEffect } from "react";

function SelectUsuario({ handleChange}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <select className="border rounded-lg border-gray-400 px-3 py-2 mb-4 w-full text-black"  name="Destinatarios" onChange={handleChange} data-te-select-init>
        <option value="">Seleccione Usuario</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectUsuario;
