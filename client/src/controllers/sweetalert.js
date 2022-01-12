import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const successAlert = (message) => {
  MySwal.fire({
    // title: "Error",
    titleText: message,
    icon: "success",
    // footer: error.message,
    // didOpen: () => {
    //   // `MySwal` is a subclass of `Swal`
    //   //   with all the same instance & static methods
    //   MySwal.clickConfirm();
    // },
  }).then(() => {
    // return MySwal.fire(<p>Shorthand works too</p>);
  });
};

const failureAlert = (message) => {
  MySwal.fire({
    // title: "Error",
    titleText: message,
    icon: "error",
    // footer: error.message,
    // didOpen: () => {
    //   // `MySwal` is a subclass of `Swal`
    //   //   with all the same instance & static methods
    //   MySwal.clickConfirm();
    // },
  }).then(() => {
    // return MySwal.fire(<p>Shorthand works too</p>);
  });
};

export { failureAlert, successAlert };
