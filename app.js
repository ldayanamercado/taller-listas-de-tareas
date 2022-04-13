// variables globales 
const formularioUI = document.querySelector('#formulario');
const listaTareaUI = document.getElementById('listaTarea');
let arrayActividades = [];
var tareaR = 0;
var  terminadas=0;
var  pendiente=0;

// funciones 
const CrearItem = (actividad) =>{
    let item ={
        actividad:actividad,
        estado: false
    }
    arrayActividades.push(item);
    return item;
}

// let correr = CrearItem('prueba');
// console.log(correr);

const guardarBD = () => {
    localStorage.setItem('tareas',JSON.stringify(arrayActividades));
    PintarDB();

}


const PintarDB = () => {
    listaTareaUI.innerHTML = '';
        arrayActividades = JSON.parse(localStorage.getItem('tareas'));
        if(arrayActividades === null){
            arrayActividades = [];
        }else{

            arrayActividades.forEach(element => {
                if(element.estado){
                    listaTareaUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="fa-solid fa-list-check  "id="ilista" ></i><b id="texto">${element.actividad}</b> - <b> Tarea Terminada </b><span class="float-right" id="Iacciones"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div></div>`

                }else{
                    listaTareaUI.innerHTML += `<div class="alert alert-primary" role="alert"><i class="fa-solid fa-list-check  "id="ilista" ></i><b id="texto">${element.actividad}</b> - <b> Tarea En Proceso </b><span class="float-right" id="Iacciones"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div></div>`
                    //tareaR = (arrayActividades.length);    
                }     
            });
    
        }
        terminadas =0;
        pendiente =0;
        
        arrayActividades.forEach(element =>{
            if(element.estado == true){
                terminadas += 1;
            }else{
                pendiente +=1;
            }
        })
        tareaR = (arrayActividades.length); 
        var registradas = document.getElementById('registradas');
        registradas.innerHTML=tareaR;
        console.log(tareaR);
        var Tterminadas = document.getElementById('Tterminadas');
        Tterminadas.innerHTML=terminadas;
        console.log(terminadas);
        var Ppendiente = document.getElementById('Ppendiente');
        Ppendiente.innerHTML=pendiente;
        console.log(pendiente);
    }



formularioUI.addEventListener('submit', (e) => {
    // previene cualquier evento que exista en el submit
    e.preventDefault();
    // leer el input
    let tareaUI = document.querySelector('#tarea').value;
    console.log(tareaUI);
    CrearItem (tareaUI);
    guardarBD();
    formularioUI.reset();
});

const EliminarDB = (actividad) => {
    //console.log(actividad);

    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        console.log(index);
        if( elemento.actividad === actividad ){
            indexArray = index;
        }   
    }) 
    arrayActividades.splice(indexArray, 1);
    guardarBD();
}
const EditarDB = (actividad) => {

    let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad ===
    actividad);
    console.log(arrayActividades[indexArray]);

    arrayActividades[indexArray].estado = true;
    guardarBD();

   
}



// pintar 
document.addEventListener('DOMContentLoaded', PintarDB);
listaTareaUI.addEventListener('click', (e) => {
    e.preventDefault();
    //console.log(e);
    //console.log(e.path[2].childNodes[3].innerHTML);
    //console.log(e.target.innerHTML);
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete' ){
       // console.log(e.path[2].childNodes[1].innerHTML);
        let texto = e.path[2].childNodes[1].innerHTML;
    //console.log(e.path[2].childNodes[1].innerHTML);
        if(e.target.innerHTML === 'delete'){
            //console.log(e.path[2].childNodes[1].innerHTML);
            EliminarDB(texto);
        }
    }
    
    if(e.target.innerHTML === 'done'){
        
        EditarDB(e.path[2].childNodes[1].innerHTML)

    }
 
});
