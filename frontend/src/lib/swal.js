import Swal from 'sweetalert2';

const MySwal = Swal.mixin({
    background: '#f0f4ea',
    color: '#34482c',
    confirmButtonColor: '#5c9b3a',
    cancelButtonColor: '#6b8562',
    customClass: {
        popup: 'rounded-[50px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] border-0 p-6',
        confirmButton: 'rounded-xl font-bold px-6 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary/50',
        cancelButton: 'rounded-xl font-semibold px-6 py-2.5 text-sm transition-all',
        title: 'text-xl font-bold text-foreground',
        htmlContainer: 'text-sm text-muted-foreground'
    },
    buttonsStyling: true
});

export const showSuccess = (title, text) => {
    return MySwal.fire({
        icon: 'success',
        title,
        text,
        iconColor: '#5c9b3a'
    });
};

export const showError = (title, text) => {
    return MySwal.fire({
        icon: 'error',
        title,
        text,
        iconColor: '#ef4444'
    });
};

export const showConfirm = (title, text, confirmButtonText = 'Yes', cancelButtonText = 'Cancel') => {
    return MySwal.fire({
        title,
        text,
        icon: 'question',
        iconColor: '#5c9b3a',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        reverseButtons: true
    });
};

export const showToast = (title, icon = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#f0f4ea',
        color: '#34482c',
        iconColor: icon === 'success' ? '#5c9b3a' : icon === 'error' ? '#ef4444' : undefined,
        customClass: {
            popup: 'rounded-2xl font-sans shadow-md border-0 p-3',
            title: 'text-sm font-bold text-foreground'
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
    return Toast.fire({
        icon,
        title
    });
};
