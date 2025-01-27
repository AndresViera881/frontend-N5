import { useEffect, useState } from "react";
import Permiso from "../interfaces/Permiso";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import axiosInstance from "../utils/axios.config";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";

const PermisoPage = () => {
  const [rows, setRows] = useState<Permiso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [nuevoPermiso, setNuevoPermiso] = useState<Permiso>({
    id: 0,
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: 1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cargarPermisos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get<Permiso[]>("/permisos");
      const transformedData = response.data.map((permiso) => ({
        ...permiso,
        tipoPermiso: permiso.tipoPermiso.descripcion,
      }));
      setRows(transformedData);
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPermisos();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoPermiso({
      ...nuevoPermiso,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setNuevoPermiso({
      ...nuevoPermiso,
      tipoPermiso: e.target.value as number,
    });
  };

  const handleEdit = (row: Permiso) => {
    setNuevoPermiso(row);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (
      !nuevoPermiso.nombreEmpleado ||
      !nuevoPermiso.apellidoEmpleado ||
      nuevoPermiso.tipoPermiso === 0
    ) {
      setOpen(false);
      setNuevoPermiso({
        id: 0,
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermiso: 0,
      });
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    try {
      if (nuevoPermiso.id === 0 || nuevoPermiso.id === undefined) {
        await axiosInstance.post("/permisos", nuevoPermiso);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Permiso agregado correctamente.",
        });
      } else {
        await axiosInstance.put(`/permisos/${nuevoPermiso.id}`, nuevoPermiso);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Permiso actualizado correctamente.",
        });
      }

      setNuevoPermiso({
        id: 0,
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermiso: 0,
      });
      setOpen(false);
      cargarPermisos();
    } catch (error) {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: `Hubo un error al guardar el permiso.`,
      });
    }
  };

  if (loading) {
    return <div>Cargando permisos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const columns = [
    { label: "ID", key: "id" as keyof Permiso },
    { label: "Nombre", key: "nombreEmpleado" as keyof Permiso },
    { label: "Apellido", key: "apellidoEmpleado" as keyof Permiso },
    { label: "Tipo Permiso", key: "tipoPermiso" as keyof Permiso },
    { label: "Acciones", key: "acciones" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Listado de Permisos</h1>
        <button
          onClick={handleOpen}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <AddIcon className="mr-2" />
          Agregar
        </button>
      </div>

      {/* Tabla de permisos */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="permisos table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key as string}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.slice(0, -1).map((column) => (
                  <TableCell key={column.key as string}>
                    {row[column.key] as string}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(row)} // Llama a la función para editar
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para agregar o editar un permiso */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {nuevoPermiso.id === 0 ? "Agregar Permiso" : "Editar Permiso"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre del Empleado"
            fullWidth
            name="nombreEmpleado"
            value={nuevoPermiso.nombreEmpleado}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Apellido del Empleado"
            fullWidth
            name="apellidoEmpleado"
            value={nuevoPermiso.apellidoEmpleado}
            onChange={handleInputChange}
          />

          {/* Select para Tipo de Permiso */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Tipo de Permiso</InputLabel>
            <Select
              label="Tipo de Permiso"
              name="tipoPermiso"
              value={nuevoPermiso.tipoPermiso}
              onChange={handleSelectChange}
            >
              <MenuItem value={1}>Vacaciones</MenuItem>
              <MenuItem value={2}>Enfermedad</MenuItem>
              <MenuItem value={3}>Maternidad</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {nuevoPermiso.id === 0 || undefined ? "Agregar" : "Actualizar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PermisoPage;
