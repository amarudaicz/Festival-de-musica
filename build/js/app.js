document.addEventListener("DOMContentLoaded", function(){
    iniciarApp()
});

function iniciarApp() {
    crearGaleria();
}

//CRAEMOS GALERIA
function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    
        for (let i = 1; i <= 12; i++) {

        const imagenes = document.createElement("picture")
        imagenes.innerHTML = 
        `<source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/${i}.jpg" alt="imagen galeria">`;

        imagenes.onclick=function(){
            mostrarImagen(i)
        }
        galeria.appendChild(imagenes)
        console.log(imagenes)
    }

    //FUNCION MOSTRAR IMAGEN
    function mostrarImagen(id) {
    
        const imagenes = document.createElement("picture")
        imagenes.innerHTML = 
        `<source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/${id}.jpg" alt="imagen galeria">`;
       
        //Creamos el overlay con la imagen
        const overlay = document.createElement("DIV")
        overlay.appendChild(imagenes)
        overlay.classList.add("overlay")
        overlay.onclick = function () {//Añadimos el evento con el callback para cerrar el modal cuando damos click en el overlay
            const body = document.querySelector("body")
            body.classList.remove("fijar-body");
            overlay.remove();
        }
        //Boton para cerrar la ventana modal
        const cerrarModal = document.createElement("P")
        cerrarModal.textContent= "X";
        cerrarModal.classList.add("btn-cerrar")
        cerrarModal.onclick=function () {//Creamos el evento onclick para cerrar agregando un callback
             overlay.remove();
             const body = document.querySelector("body")
             body.classList.remove("fijar-body");
        };
        overlay.appendChild(cerrarModal)//Insertamos el boton dentro del overlay centrado, asi aparecera solo cuando el overlay aparece
        //Insertamos el overlay con appendChild al body
        const body = document.querySelector("body")
        body.appendChild(overlay)
        body.classList.add("fijar-body");


        
    }



}