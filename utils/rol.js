const ADMIN_REQUERIMIENTOS = {
  icon: 'mdi-clipboard-alert',
  title: 'Requerimientos',
  to: '/admin/requerimientos',
  name:"admin-requerimientos"
}

const ADMIN_INCIDENTES = {
  icon: 'mdi-alert',
  title: 'Incidentes',
  to: '/admin/incidentes',
  name:"admin-incidentes"
}

const ADMIN_CATEGORIES = {
  icon: 'mdi-tag',
  title:'Categorías',
  to:'/admin/categorias',
  name:'admin-categorias'
}
const ADMIN_USUARIOS = {
  icon: 'mdi-account',
  title: 'Usuarios',
  to: '/admin/usuarios',
  name:"admin-usuarios"
}



const CLIENT_REQUERIMIENTOS = {
  icon: 'mdi-clipboard-alert',
  title: 'Mis Requerimientos',
  name:"requerimientos",
  to: '/requerimientos'
}

const INCIDENTES = {
  icon: 'mdi-alert',
  title: 'Mis incidentes',
  name:"incidentes",
  to: '/incidentes'
}

const LOGOUT =  {
  icon: 'mdi-logout',
  title: 'Salir',
  name:"index",
  to: '/'
}


const rols = {
    tech :[
          ADMIN_REQUERIMIENTOS,
          ADMIN_INCIDENTES,
          ADMIN_USUARIOS,
          LOGOUT
    ],
    tech_2:[
        ADMIN_REQUERIMIENTOS,
        ADMIN_INCIDENTES,
        ADMIN_USUARIOS,
        LOGOUT
    ],
    admin: [
          ADMIN_REQUERIMIENTOS,
          ADMIN_INCIDENTES,
          ADMIN_USUARIOS,
          ADMIN_CATEGORIES,
          LOGOUT
    ],
    teacher: [
          CLIENT_REQUERIMIENTOS,
          INCIDENTES, 
          LOGOUT
    ],
    volunteer: [
        CLIENT_REQUERIMIENTOS,
        INCIDENTES,
        LOGOUT
    ]

}


export const getPathHome = (path)=>{
  if (path === "admin"){
    return rols.admin[0].name 
  }
}

export const checkAdminNavigation = (path)=>{
  if(!(rols.admin.some(x=>path.includes(x.name))))
    return rols.admin[0].to
  return ""
}

export const checkTechNavigation = (path)=>{
  if(!(rols.tech.some(x=>path.includes(x.name))))
    return rols.tech[0].to 
  return ""
}

export const checkTeacherNavigation = (path)=>{
  if(!(rols.teacher.some(x=>path.includes(x.name))))
    return rols.teacher[0].to 
  return ""
}

export const checkVolunteerNavigation = (path)=>{
  if(!(rols.volunteer.some(x=>x.name === path)))
    return rols.volunteer[0].to 
  return ""
}


export const getPathRolHome = (path,rol) => {
  if(rol=== 'admin'){
    return checkAdminNavigation(path)
  }
  if(rol === "tech" || rol === "tech_2" ){
    return checkTechNavigation(path)
  }

  if(rol === "teacher"){
    return checkTeacherNavigation(path)
  }
  if(rol === "volunteer"){
    return checkVolunteerNavigation(path)
  }
  return ""
}

export const getNavOptions = (rol)=> {
    return rols[rol]
}