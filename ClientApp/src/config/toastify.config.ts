import { type ToastContainerProps, type ToastOptions } from 'react-toastify';

const toastifyProps: ToastContainerProps = {
  autoClose: 1500,
  draggable: false,
  newestOnTop: true,
  theme: 'colored',
  position: 'top-center'
};

const errorToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  progress:undefined,
  draggable: false,
  theme: "colored",
};

const successToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const apiToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export {
  toastifyProps,
  errorToastOptions,
  successToastOptions,
  apiToastOptions
};