import Swal from "sweetalert2";

export const sendFormAlert = () => {
    return Swal.fire({
        position: "center",
        icon: "success",
        title: "Formulario enviado con exito",
        showConfirmButton: false,
        timer: 1500,
    });
};