import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      'app.name': 'Elderly Care App',
      'app.welcome': 'Welcome',
      'app.logout': 'Logout',
      'app.language': 'Language',
      
      // Tasks
      'tasks.title': 'Tasks',
      'tasks.add': 'Add Task',
      'tasks.edit': 'Edit Task',
      'tasks.delete': 'Delete Task',
      'tasks.complete': 'Complete Task',
      'tasks.priority': {
        high: 'High Priority',
        medium: 'Medium Priority',
        low: 'Low Priority'
      },
      'tasks.recurring': 'Recurring Task',
      'tasks.notes': 'Notes',
      'tasks.attachments': 'Attachments',
      
      // Medicine
      'medicine.title': 'Medicine Tracker',
      'medicine.add': 'Add Medicine',
      'medicine.edit': 'Edit Medicine',
      'medicine.delete': 'Delete Medicine',
      'medicine.dosage': 'Dosage',
      'medicine.frequency': 'Frequency',
      'medicine.reminder': 'Set Reminder',
      'medicine.prescription': 'Upload Prescription',
      
      // Grocery
      'grocery.title': 'Grocery List',
      'grocery.add': 'Add Item',
      'grocery.edit': 'Edit Item',
      'grocery.delete': 'Delete Item',
      'grocery.categories': {
        fruits: 'Fruits',
        vegetables: 'Vegetables',
        grains: 'Grains',
        dairy: 'Dairy',
        meat: 'Meat',
        other: 'Other'
      },
      'grocery.reorder': 'Reorder',
      'grocery.total': 'Total',
      
      // Emergency
      'emergency.title': 'Emergency SOS',
      'emergency.call': 'Call Emergency Services',
      'emergency.message': 'Send Emergency Message',
      'emergency.location': 'Share Location',
      'emergency.confirm': 'Are you sure you want to send an emergency message?',
      'emergency.phone': 'Emergency Contact Number',
      
      // Auth
      'auth.login': 'Login',
      'auth.signup': 'Sign Up',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.forgotPassword': 'Forgot Password?'
    }
  },
  es: {
    translation: {
      // Common
      'app.name': 'Aplicación de Cuidado de Ancianos',
      'app.welcome': 'Bienvenido',
      'app.logout': 'Cerrar Sesión',
      'app.language': 'Idioma',
      
      // Tasks
      'tasks.title': 'Tareas',
      'tasks.add': 'Agregar Tarea',
      'tasks.edit': 'Editar Tarea',
      'tasks.delete': 'Eliminar Tarea',
      'tasks.complete': 'Completar Tarea',
      'tasks.priority': {
        high: 'Alta Prioridad',
        medium: 'Prioridad Media',
        low: 'Baja Prioridad'
      },
      'tasks.recurring': 'Tarea Recurrente',
      'tasks.notes': 'Notas',
      'tasks.attachments': 'Archivos Adjuntos',
      
      // Medicine
      'medicine.title': 'Seguimiento de Medicamentos',
      'medicine.add': 'Agregar Medicamento',
      'medicine.edit': 'Editar Medicamento',
      'medicine.delete': 'Eliminar Medicamento',
      'medicine.dosage': 'Dosis',
      'medicine.frequency': 'Frecuencia',
      'medicine.reminder': 'Establecer Recordatorio',
      'medicine.prescription': 'Subir Receta',
      
      // Grocery
      'grocery.title': 'Lista de Compras',
      'grocery.add': 'Agregar Artículo',
      'grocery.edit': 'Editar Artículo',
      'grocery.delete': 'Eliminar Artículo',
      'grocery.categories': {
        fruits: 'Frutas',
        vegetables: 'Verduras',
        grains: 'Granos',
        dairy: 'Lácteos',
        meat: 'Carne',
        other: 'Otros'
      },
      'grocery.reorder': 'Reordenar',
      'grocery.total': 'Total',
      
      // Emergency
      'emergency.title': 'SOS de Emergencia',
      'emergency.call': 'Llamar a Servicios de Emergencia',
      'emergency.message': 'Enviar Mensaje de Emergencia',
      'emergency.location': 'Compartir Ubicación',
      'emergency.confirm': '¿Está seguro de que desea enviar un mensaje de emergencia?',
      'emergency.phone': 'Número de Contacto de Emergencia',
      
      // Auth
      'auth.login': 'Iniciar Sesión',
      'auth.signup': 'Registrarse',
      'auth.email': 'Correo Electrónico',
      'auth.password': 'Contraseña',
      'auth.confirmPassword': 'Confirmar Contraseña',
      'auth.forgotPassword': '¿Olvidó su Contraseña?'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 