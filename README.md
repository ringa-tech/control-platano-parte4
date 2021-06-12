# Controla tus videojuegos con un plátano (Parte 4)

### Código

Este es el código fuente para el video "Programa un plátano para controlar videojuegos - 4 | Programemos en vivo" del canal [Ringa Tech](https://youtube.com/c/RingaTech)

### Cómo utilizarlo
Este código cuenta con las siguientes secciones
#### NET
El código de .NET está programado en C#, y lo hice utilizando Visual Studio 2019 y .NET Framework 4.7. Se trata de una aplicación de consola que compila a un ejecutable. Dicho ejecutable acepta algunos textos para convertirlos en señales para simular teclas del teclado.
#### NODE
Este proyecto se complica un poco más que los anteriores ya que utilizo un servidor web, y estoy utilizando node.js para esto, con la librería *express*.

El código que normalmente veíamos en el explorador simplemente abriendo el archivo HTML en Chrome, ahora requiere que:
1. Abramos una línea de comando y naveguemos a la carpeta "node"
2. La primera vez necesitamos instalar las dependencias. Para esto ejecutamos el comando "npm update" (ojo, es necesario contar con Node.js instalado previamente).
3. Finalmente levantamos el servidor con "node index.js"
4. Podemos detenerlo con Ctrl+C
5. Para ver la aplicación, es necesario ir a un explorador y poner en el URL: http://localhost:3000/index.html

### Siguientes pasos
Con esto terminamos el proyecto. ¡Al fin!
Déjame saber cualquier comentario que tengas, incidencia, o si quieres enviarme PRs para integrar otras plataformas aparte de Windows, excelente.

¡Suscríbete al canal para que te notifique de nuevos videos!