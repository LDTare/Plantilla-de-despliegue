import { useState, useEffect } from "react";

function SelectTipoTra({ handleChange}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/tipotramite", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <select className="border rounded-lg border-gray-400 px-3 py-2 mb-4 w-full text-black"  name="tipotra_id" onChange={handleChange} data-te-select-init>
        <option value="">Seleccionar Tipo Trámite</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.Nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SelectTipoTra;
