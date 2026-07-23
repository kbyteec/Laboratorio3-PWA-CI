console.log('[SW] Archivo custom-sw.js cargado');

//Evento instalado: se ejecuta cunado l Service Worker se instala

self.addEventListener("install", (event) =>{
    console.log('[SW] Evento install ejecutando');
    console.log('[SW] El Service Worker esta instalado')

    //Forzar al nuevo Service Worker a activarse sin esperar
    self.skipWaiting();
});

// Evento activate: se ejecuta cuando el Service Worker toma el control
self.addEventListener('activate', (event) =>{
    console.log('[SW] Evento activate SW ejecutado');
    console.log('[SW] Evento activate SW está activo');
    // Permitir que el SW controle las pestanias abiertas
    event.waitUntil(self.clients.claim());
});

// Evento fetch: se ejecuta cada vez que las app solicita un recurso
self.addEventListener('fetch', (event) => {
    console.log('[SW] Evento fetch:', event.request.url);
});

// Evento message: permite recibir mensajes desde la aplicación
self.addEventListener('message', (event) => {
    console.log('[SW] Mensaje recibido', event.data);
});

importScripts('./ngsw-worker.js');