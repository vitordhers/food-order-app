import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const fireToast = (args: {
  icon?: SweetAlertIcon | undefined;
  title?: string | HTMLElement | JQuery | undefined;
  html?: string | HTMLElement | JQuery | undefined;
  text?: string | undefined;
}) => withReactContent(Toast).fire(args);

export default fireToast;
