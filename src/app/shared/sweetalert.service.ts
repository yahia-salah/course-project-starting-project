import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

export interface Toast {
  content: string;
  icon?: SweetAlertIcon | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  toast: typeof Swal;
  constructor() {
    this.toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      color: '#fff',
      background: '#212529',
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }

  showToast(toast: Toast) {
    this.toast.fire({
      icon: toast.icon ?? 'info',
      title: toast.content,
      iconColor: '#fff',
      background:
        toast.icon === 'success'
          ? '#198754'
          : toast.icon === 'error'
          ? '#dc3545'
          : '#212529',
    });
  }

  showConfirm(options: SweetAlertOptions) {
    return Swal.fire(options);
  }
}
