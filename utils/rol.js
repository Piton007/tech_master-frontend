const ADMIN_REQUERIMIENTOS = {
  icon: 'mdi-clipboard-alert',
  title: 'Requerimientos',
  to: '/admin/requerimientos',
  name:"admin-requerimientos"
}
const ADMIN_USUARIOS = {
  icon: 'mdi-account',
  title: 'Usuarios',
  to: '/admin/usuarios',
  name:"admin-usuarios"
}

const ADMIN_REPORTES_REQUERIMIENTOS = {
  icon: 'mdi-file-chart',
  title: 'Reporte de Requerimientos',
  to: '/admin/reportes',
  name:"admin-reportes"
}

const CLIENT_REQUERIMIENTOS = {
  icon: 'mdi-clipboard-alert',
  title: 'Mis Requerimientos',
  name:"requerimientos",
  to: '/requerimientos'
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
          ADMIN_USUARIOS,
          LOGOUT
    ],
    admin: [
          ADMIN_REQUERIMIENTOS,
          ADMIN_USUARIOS,
          ADMIN_REPORTES_REQUERIMIENTOS,
          LOGOUT
    ],
    teacher: [
          CLIENT_REQUERIMIENTOS,
          LOGOUT
    ],
    volunteer: [
        CLIENT_REQUERIMIENTOS,
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
  if(rol === "tech"){
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