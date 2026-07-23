import { Component, HostListener, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// modelo de tarea
interface Tarea {
  texto: string;
  completada: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  titulo = 'Laboratorio - PWA - Nueva Prueba';

  nuevaTarea = '';

  estadoOnline = navigator.onLine;

  tareas : Tarea[] = [
    { texto: 'Tarea 1', 
      completada: false
    },
    { texto: 'Tarea 2',
      completada: false
    },
    { texto: 'Tarea 3',
      completada: false
    }
  ];
  
  ngOnInit(): void {
    console.log('[App] Aplicacion iniciada');
    console.log('[App] Estado inicial: ', this.estadoOnline ? 'Online' : 'Offline');

    // Verificamos si el navegador soporta serviceWorker
    if ('serviceWorker' in navigator) {
      console.log('[App] Service Worker soportado');
      
      navigator.serviceWorker.ready.then((registro) => {
        console.log('[App] Service Worker listo ', registro);
      });
    } else {
      console.warn('[App] Service Worker NO soportado');
    }
  }

  // se ejecuta cuando el navegador cambia de estado (online/offline)
  @HostListener('window:online')
  cuandoVuelveInternet() {
    this.estadoOnline = true;
    console.log('[App] La Aplicación volvió a estar en línea');
  }

  @HostListener('window:offline')
  cuandoPierdeInternet() {
    this.estadoOnline = false;
    console.log('[App] La Aplicación se quedó sin conexión');
  }

  agregarTarea() {
    const textoLimpio = this.nuevaTarea.trim();
    if (textoLimpio.length === 0) {
      console.warn('[App] No se puede agregar una tarea vacía');
      return;
    }

    this.tareas.push({
      texto: textoLimpio, 
      completada: false 
    });
    console.log('[App] Tarea agregada: ', textoLimpio);

    this.nuevaTarea = '';
  }

  cambiarEstado(tarea: Tarea) {
    tarea.completada = !tarea.completada;
    console.log('[App] Estado de tarea cambiado:', tarea);
  }

  eliminarTarea(indice: number) {
    const tarea = this.tareas[indice];
    if (!tarea) {
      return;
    }

    tarea.completada = true;
    console.log('[App] Tarea marcada como eliminada:', tarea);
  }
}
