import DataTable from "../components/Table";
import TipoPermiso from "../interfaces/TipoPermiso";
import TipoPermisos from "../utils/TipoPermisoEnum";

const rows = [
  { id: 1, descripcion: TipoPermisos.Administrador },
  { id: 2, descripcion: TipoPermisos.Usuario },
];

const columns = [
  { label: "ID", key: "id" as keyof TipoPermiso },
  { label: "Descripción", key: "descripcion" as keyof TipoPermiso },
];

const TipoPermisoPage = () => {
  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  );
};

export default TipoPermisoPage;
