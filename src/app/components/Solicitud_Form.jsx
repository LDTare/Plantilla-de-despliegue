"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import SelectTipoTra from "./SelectTipoTramite";
import ReCAPTCHA from "react-google-recaptcha";
import { useDebounce } from "use-debounce";

function SolicitudForm() {
  const [solicitud, setSolicitud] = useState({
    Motivo: "",
    Fecha: "",
    tipotra_id: "",
    cliente_dpi: "",
    comentario: "",
    cliente_nombre: "",
    cliente_apellido: "",
    cliente_nit: "",
    cliente_telefono: "",
  });

  const router = useRouter();
  const params = useParams();

  const [requisitosoli, setRequisitosoli] = useState([]);
  const [requisitosNoMarcados, setRequisitosNoMarcados] = useState([]);

  const [clienteExiste, setClienteExiste] = useState(false);
  const [dpiValido, setDpiValido] = useState(false);
  const captcha = useRef(null);
  const [captchaValido, cambiarCaptchaValido] = useState(null);

  const [requisitosCompletados, setRequisitosCompletados] = useState(0);
  const [tipoTramiteSeleccionado, setTipoTramiteSeleccionado] = useState("");

  const [debounceCliente] = useDebounce(solicitud, 1000);

  const onChange = () => {
    if (captcha.current.getValue()) {
      console.log("Usuario validado");
      cambiarCaptchaValido(true);
    }
  };
  const submit = (e) => {
    e.preventDefault();
  };
  const HandleChange = async (e) => {
    const { name, value, checked } = e.target;
    setSolicitud({
      ...solicitud,
      [name]: value,
    });

    if (name === "tipotra_id") {
      setTipoTramiteSeleccionado(value);
      const requisitos = await obtenerRequisitosPorTipoTramite(value);
      setRequisitosoli(requisitos);
    }
    if (name === "requisitos") {
      const requisito = e.target.value;
      if (!checked) {
        setRequisitosNoMarcados((prevRequisitos) =>
          prevRequisitos.filter((item) => item !== requisito)
        );
      } else {
        setRequisitosNoMarcados((prevRequisitos) => [
          ...prevRequisitos,
          requisito,
        ]);
      }
      setRequisitosCompletados((prevRequisitos) => {
        return checked ? prevRequisitos + 1 : prevRequisitos - 1;
      });
    }
  };
  const obtenerRequisitosPorTipoTramite = async (tipoTramiteId) => {
    const response = await fetch(`/api/requisitosolicitud/${tipoTramiteId}`);
    if (response.status === 200) {
      const requisitos = await response.json();
      return requisitos;
    }
    return [];
  };

  useEffect(() => {
    const fetchCliente = async () => {
      if (solicitud.cliente_dpi.length === 13) {
        setDpiValido(true);
      } else {
        setDpiValido(false);
      }

      try {
        if (dpiValido) {
          const response = await fetch(
            `/api/cliente/${debounceCliente.cliente_dpi}`
          );
          if (response.status === 200) {
            setClienteExiste(true);
          } else {
            setClienteExiste(false);
          }
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchCliente();

    if (clienteExiste && dpiValido) {
      const fetchData = async () => {
        const res = await fetch(`/api/cliente/${debounceCliente.cliente_dpi}`);
        if (res.status === 200) {
          const clienteData = await res.json();
          setSolicitud((prevState) => ({
            ...prevState,
            cliente_nombre: clienteData.Nombre,
            cliente_apellido: clienteData.Apellido,
            cliente_nit: clienteData.NIT,
            cliente_telefono: clienteData.Telefono,
          }));
        }
      };
      fetchData();
    }
    if (params.id) {
      fetch("/api/solicitud/" + params.id)
        .then((res) => res.json())
        .then((data) => {
          setSolicitud({
            nombre: data.nombre,
            descripcion: data.descripcion,
            Motivo: data.Motivo,
            Fecha: data.Fecha,
            tipotra_id: data.tipotra_id,
            cliente_dpi: data.cliente_dpi,
            estadosolicitud_id: data.estadosolicitud_id,
          });
        });
    }
  }, [solicitud.cliente_dpi, clienteExiste, debounceCliente]);

  const solicitudCompleta = () => {
    const cantidadTotalRequisitos = requisitosoli.length;
    return requisitosCompletados === cantidadTotalRequisitos;
  };

  const frmPrevent = (e) => {
    e.preventDefault();
  };
  const HandleOnSubmit = async (e) => {
    e.preventDefault();

    if (!params.id) {
      if (
        solicitud.cliente_dpi &&
        solicitud.tipotra_id &&
        captcha.current.getValue()
      ) {
        if (solicitudCompleta()) {
          solicitud.estadosolicitud_id = 2;
          //Creacion de solicitud
          const res = await fetch("/api/solicitud", {
            method: "POST",
            body: JSON.stringify(solicitud),
            headers: {
              "Content-Type": "application/json",
            },
          });
          //Creacion de trámite automatica
          const solicitudData = await res.json();
          if (solicitudData) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();

            const solicitudId = solicitudData.id;
            const numeroTramite = solicitudId;

            const correlativo = `${numeroTramite}-${currentYear}`;
            const tramite = {
              correlativo: correlativo.toString(),
              id_estado: 1,
              sol_id: solicitudData.id,
              tt_id: solicitud.tipotra_id,
              client_id: solicitudData.cliente_dpi,
            };

            console.log(tramite);
            const tramiteResponse = await fetch("/api/tramite", {
              method: "POST",
              body: JSON.stringify(tramite),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (tramiteResponse.status === 200) {
              const tramiteData = await tramiteResponse.json();
              const tramiteID = tramiteData.id;

              console.log("Tramite creado: ", tramiteData);
              cambiarCaptchaValido(true);
              router.refresh();
              router.push("/solicitudes/dashboard");
            } else {
              console.log("Error al crear el trámite");
            }
          }
        } else {
          solicitud.estadosolicitud_id = 1;
          const requisitosNoMarcadosTexto =
            requisitosNoMarcados.length > 0
              ? `Requisitos completados: ${requisitosNoMarcados.join(", ")}`
              : "";
          solicitud.comentario = requisitosNoMarcadosTexto;
          //Creacion de solicitud
          const res = await fetch("/api/solicitud", {
            method: "POST",
            body: JSON.stringify(solicitud),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(solicitud);
          router.refresh();
          router.push("/solicitudes/dashboard");
        }
      } else {
        console.log("Falta información para crear la solicitud");
        cambiarCaptchaValido(false);
      }
    } else {
      if (solicitud.cliente_dpi && solicitud.tipotra_id) {
        //Modificacion de parametros de la solicitud
        const res = await fetch(`/api/solicitud/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(solicitud),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        console.log("Falta información para actualizar la solicitud");
      }
    }
  };

  //Formulario
  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
      <div className="p-2 bg-blue-950 shadow w-full rounded-lg divide-y divide-gray-200">
        <form className="px-5 py-5" onSubmit={frmPrevent}>
          <label className="font-semibold text-sm pb-1 block">
            Tipo de trámite
          </label>
          <SelectTipoTra handleChange={HandleChange} />
          {tipoTramiteSeleccionado ? (
            <label className="font-semibold text-sm pb-1 block">
              Requisitos:
            </label>
          ) : null}
          <div className=" px-3 py-2 rounded border my-2">
            {requisitosoli.map((requisito) => (
              <label
                className="rounded-lg px-3 py-2 mt-1 mb-5 w-full"
                key={requisito.id}
              >
                <input
                  className=" mx-2"
                  type="checkbox"
                  key={requisito.nombre}
                  name="requisitos"
                  value={requisito}
                  onChange={HandleChange}
                />
                {requisito}
              </label>
            ))}
          </div>
          <label className="font-semibold text-sm pb-1 block">
            {" "}
            DPI del vecino{" "}
          </label>
          <div className="flex">
            <input
              type="text"
              id="cliente_dpi"
              name="cliente_dpi"
              className={`border rounded-lg px-3 py-2 mt-1 mb-5 w-full text-black ${
                dpiValido
                  ? " border-green-500 border-2"
                  : "border-red-500 border-2"
              }`}
              placeholder="Cliente solicitante"
              onChange={HandleChange}
              value={solicitud.cliente_dpi}
              required
            />
          </div>
          <label className="font-semibold text-sm pb-1 block">
            Motivo de la solicitud
          </label>
          <textarea
            name="Motivo"
            id="Motivo"
            rows="3"
            className=" border border-gray-400 p-2 mb-4 w-full text-black"
            onChange={HandleChange}
            value={solicitud.Motivo}
          ></textarea>
          {!dpiValido && (
            <p className="text-red-500">
              El DPI debe tener exactamente 13 caracteres
            </p>
          )}
          {clienteExiste ? (
            <div className="bg-blue-500 text-white rounded-lg p-2 mt-4">
              <p className="font-bold">Nombre: {solicitud.cliente_nombre}</p>
              <p className="font-bold">
                Apellido: {solicitud.cliente_apellido}
              </p>
              <p className="font-bold">NIT: {solicitud.cliente_nit}</p>
              <p className="font-bold">
                Teléfono: {solicitud.cliente_telefono}
              </p>
            </div>
          ) : (
            <button
              onClick={() => {
                router.push("/clientes/new");
              }}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none shadow-lg mt-6"
            >
              Crear Cliente
            </button>
          )}
          <br />
          {captchaValido === false && (
            <p className="text-red-500">Por favor acepta el captcha</p>
          )}
          <div className="recaptcha" onSubmit={submit}>
            <ReCAPTCHA
              ref={captcha}
              sitekey="6Ld3h8koAAAAAMjmT7gg7kpvLJEdzTKtdbhbsJ-d"
              onChange={onChange}
            />
          </div>
          <button
            onClick={HandleOnSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none shadow-lg mt-4"
          >
            {params.id ? "Actualizar solicitud" : "Crear nueva solicitud"}
          </button>
          <button
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold
        py-2 px-4 mx-5 rounded focus:outline-none shadow-lg mt-6"
            onClick={() => {
              router.push("/solicitudes/dashboard");
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default SolicitudForm;
