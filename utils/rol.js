const rols = {
    tech :[
          {
            icon: 'mdi-clipboard-alert',
            title: 'Incidentes',
            to: '/incidentes'
          },
          {
            icon: 'mdi-account',
            title: 'Usuarios',
            to: '/usuarios'
          }
    ],
    admin: [

          {
            icon: 'mdi-clipboard-alert',
            title: 'Incidentes',
            to: '/incidentes'
          },
          {
            icon: 'mdi-account',
            title: 'Usuarios',
            to: '/usuarios'
          }
    ],
    teacher: [

          {
            icon: 'mdi-clipboard-alert',
            title: 'Mis Incidentes',
            to: '/incidentes'
          },
    ],
    volunteer: [

          {
            icon: 'mdi-clipboard-alert',
            title: 'Mis Incidentes',
            to: '/inspire'
          },
    ]

}



export const getNavOptions = (rol)=> {
    return rols[rol]
}