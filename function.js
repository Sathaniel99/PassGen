const chars = "1234567890abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ.*-+='´[]()~°!#$%&/=?@\:;<>`_{}|^¡¿";
const generar_button = document.getElementById("generar");
const password_label = document.getElementById("password");
const copy_button = document.getElementById("copy");

function generarNumeroAleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

generar_button.addEventListener('click', () => {
    let new_pass = "";
    let limit = generarNumeroAleatorio(8, 15);

    for (let i = 0; i < limit; i++) {
        new_pass += chars.at(generarNumeroAleatorio(0, chars.length - 1));
    }
    password_label.innerText = new_pass;
});

function showToast(type, message, icon = '') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const defaultIcons = {
        success: 'check-circle',
        danger: 'x-circle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };
    
    const toastIcon = icon || defaultIcons[type] || 'info-circle';
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="bi bi-${toastIcon}"></i>
            <span>${message}</span>
        </div>
    `;

    toastContainer.appendChild(toast);

    void toast.offsetWidth;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('transitionend', () => {
            toast.remove();
            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        }, { once: true });
    }, 3000);
}

function changeButtonState(isCopied) {
    if (isCopied) {
        copy_button.classList.remove('btn-secondary');
        copy_button.classList.add('btn-success');
        copy_button.innerHTML = '<i class="bi bi-check-circle me-2"></i>Copiado';
    } else {
        copy_button.classList.remove('btn-success');
        copy_button.classList.add('btn-secondary');
        copy_button.innerHTML = '<i class="bi bi-copy me-2"></i>Copiar';
    }
}

copy_button.addEventListener('click', () => {
    const texto = password_label.innerText;
    
    if (texto && texto.length >= 8) {
        navigator.clipboard.writeText(texto).then(() => {
            showToast('success', 'Texto copiado al portapapeles');
            changeButtonState(true);
            
            setTimeout(() => {
                changeButtonState(false);
            }, 3000);
        }).catch(err => {
            showToast('danger', 'Error al copiar la contraseña');
            console.error('Error al copiar:', err);
        });
    } else {
        showToast('danger', 'Genere una contraseña válida (mínimo 8 caracteres)');
    }
});