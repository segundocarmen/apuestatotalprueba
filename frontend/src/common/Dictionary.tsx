export const Dictionary = {
    genericErrorMessage: 'Ocurrió un error',
    login: {
        title: 'Iniciar sesión',
        okButton: 'Ingresar',
        cancelButton: 'Cancelar',
    },
    homeMetadata: {
        pageName: 'PokeGo',
        titleHome: 'Gestiona tus pokemon.',
        description:
            'PokeGo, el mejor lugar para poder administrar y controlar tus pokemon',
        icon: '/icons/manifest_icons/mobile/192x192.png',
        defaulUrl: 'https://pokego.app',
        defaultImage: '/icons/redgalar-logo-meta.jpeg',
    },
    header: {
        options: {
            closeSesion: 'Cerrar sesión',
            links: [
                { id: 1, text: 'Configuración', path: '/settings' },
                { id: 2, text: 'Ayuda', path: '/help' },
            ],
        },
    },
    sectionButtons: {
        create: {
            text: 'Nuevo registro',
            identifier: 'create',
        },
        delete: {
            text: 'Eliminar registros',
            identifier: 'deleteAll',
        },
        import: {
            text: 'Importar',
            identifier: 'import',
        },
        saveImport: {
            text: 'Registrar',
            identifier: 'registerImport',
        },
    },
    sideBar: {
        options: [
            { id: 100, text: 'Administrar solicitudes', path: '/dashboard' },
            { id: 101, text: 'Registro', path: '/register' },
            { id: 102, text: 'Mi progreso', path: '/progress' },
            { id: 103, text: 'Mi perfil', path: '/profile' },
        ],
    },
    dashboard: {
        title: 'Administrar solicitudes',
        registerDetail: 'Detalle del registro',
    },
    pokemonregister: {
        title: 'Registrar pokemon',
    },
    progress: {
        title: 'Mi progreso',
    },
};
