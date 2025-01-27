import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import axiosInstance from "../utils/axios.config";
import {
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import TipoPermiso from "../utils/TipoPermisoEnum";
import Swal from "sweetalert2";
import Permiso from "../interfaces/Permiso";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  onSubmit: (formData: Record<string, string | number>) => void;
  onAdd: (newPermiso: Permiso) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  handleClose,
  title,
  content,
  onSubmit,
  onAdd, // Recibimos la función onAdd
}) => {
  const [formData, setFormData] = useState({
    nombreEmpleado: "",
    apellidoEmpleado: "",
    tipoPermiso: TipoPermiso.Administrador,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/permisos", formData);
      const newPermiso = response.data;
      onAdd(newPermiso);

      setFormData({
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermiso: TipoPermiso.Administrador,
      });
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar el permiso. Inténtelo nuevamente.",
      });
    }
  };

  const handleModalClose = () => {
    setFormData({
      nombreEmpleado: "",
      apellidoEmpleado: "",
      tipoPermiso: TipoPermiso.Administrador,
    });
    handleClose();
  };

  const tipoPermisos = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Usuario" },
  ];

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            type="text"
            name="nombreEmpleado"
            value={formData.nombreEmpleado}
            onChange={handleChange}
            required
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            type="text"
            name="apellidoEmpleado"
            value={formData.apellidoEmpleado}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="tipoPermiso-label">Tipo Permiso</InputLabel>
            <Select
              labelId="tipoPermiso-label"
              name="tipoPermiso"
              value={formData.tipoPermiso.toString()}
              onChange={handleSelectChange}
              label="Tipo Permiso"
            >
              {tipoPermisos.map((tipo) => (
                <MenuItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomModal;
