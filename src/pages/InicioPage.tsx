import { Container, Typography, Paper, Divider, Box } from "@mui/material";

export const InicioPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Bienvenido al challenge de N5
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">
            Nombre: <strong>Ing. Pablo Andres Viera Toscano</strong>
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">
            Cargo: <strong>Desarrollador Full Stack Semi Senior</strong>
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">
            Tecnologias: <strong>.NET CORE 8, React, Elasticsearch</strong>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
