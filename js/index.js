//Metodo para mostrar los mangas almacenados que se encuentren con el localstorage y mostralos en una table
let mostrarMangas = () => {
    mangasArr = JSON.parse(localStorage.getItem('mangasArr'));
    if (mangasArr === null) {
        console.log('entro');
        localStorage.setItem('mangasArr', JSON.stringify([]));
        mangasArr = [];
    }

    //Se limpia el contenido de la tabla para que no se sobre pongan datos anteriores
    document.getElementById('theadTable').innerHTML = '';
    //Creación del thead de la tabla
    const theadTable = document.getElementById('theadTable');
    const thMain = document.createElement('tr');
    theadTable.appendChild(thMain);
    const thTrOne = document.createElement('th');
    thTrOne.textContent = '#'
    thMain.appendChild(thTrOne);
    const thTrTwo = document.createElement('th');
    thTrTwo.textContent = 'Nombre del manga'
    thMain.appendChild(thTrTwo);
    const thTrThree = document.createElement('th');
    thTrThree.textContent = 'Autor del manga'
    thMain.appendChild(thTrThree);
    const thTrFour = document.createElement('th');
    thTrFour.textContent = ''
    thMain.appendChild(thTrFour);

    //Se limpia el contenido de la tabla para que no se sobre pongan datos anteriores
    document.getElementById('tbodyContent').innerHTML = '';
    //Se crea una función forEach para recorrer el arreglo con los datos del array y a la vez con los datos de cada elementro
    mangasArr.forEach((element, index) => {
        let texth1 = document.createElement('tr');
        texth1.innerHTML = `
        <td scope="row">${index + 1}</td>
        <td>${element.nombre}</td>
        <td>${element.autor}</td>
        <td>
            <div class=" container">
                <button  type="button" class="botonActions btn btn-primary" onclick="rellenarFormulario(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg> 
                </button>
                <button type="button" class="botonActions btn btn-danger" onclick="eliminarRegistro(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>     
                </button>
            </div>
        </td>`;
        document.getElementById('tbodyContent').appendChild(texth1);
    });

}
//Metodo para elominar el registro seleccionado con su posición en el arreglo
let eliminarRegistro = (idIndex) => {
    mangasAlmacenados = JSON.parse(localStorage.getItem('mangasArr'));
    mangasAlmacenados = mangasArr.filter((mangas, index) => index !== idIndex);
    localStorage.setItem('mangasArr', JSON.stringify(mangasAlmacenados));
    mostrarMangas();
}
//Metodo para rellenar el registro seleccionado con su posición en el arreglo y mostrar la información en el formulario
let rellenarFormulario = (idIndex) => {
    mangasAlmacenados = JSON.parse(localStorage.getItem('mangasArr'));
    document.getElementById('idIndex').value = idIndex;
    document.getElementById('nombreManga').value = mangasAlmacenados[idIndex].nombre;
    document.getElementById('autorManga').value = mangasAlmacenados[idIndex].autor;
}
//Metodo para actualizar el registro seleccionado
let actualizarRegistro = () => {
    let idManga = document.getElementById('idIndex').value;
    let mangaName = document.getElementById('nombreManga').value;
    let mangaAutor = document.getElementById('autorManga').value;
    // Verifica que si se encuentre con un valor el campo escondido id para poder actualizarlo sino este manda una alerta al usuario
    if (idManga == '' || isNaN(idManga)) {
        alert('Debe seleccionar un registro');
        return false;
    }
    mangasAlmacenados = JSON.parse(localStorage.getItem('mangasArr'));

    mangasAlmacenados[idManga] = {
        nombre: mangaName,
        autor: mangaAutor
    }
    //Se limpian los campos una vez se haya realizado la actualización de un manga en el arreglo
    document.getElementById('idIndex').value = '';
    document.getElementById('nombreManga').value = '';
    document.getElementById('autorManga').value = '';
   //Se guarda en local storage el objeto modificando reescribiendo sus valores del objeto
    localStorage.setItem('mangasArr', JSON.stringify(mangasAlmacenados));
    //Se manda a llmar la función de mostrar Manga para que se recargue con la información actualizada 
    mostrarMangas();
}
//Metodo para registrar mangas
let agregarRegistro = () => {
    //Se toman los campos por su id y  se extraen los valores con el .value
    let nombre = document.getElementById('nombreManga').value;
    let autor = document.getElementById('autorManga').value;
    
    //Condicional para verificar que los campos esten vacíos
    if (nombre === '' || autor === '') {
        //Si el campo vació es el nombre mostrará este error
        if (nombre === '') {
            alert('¡Por favor llene el campo del nombre del manga!');
        }
        //Si el campo vació es el autor mostrará este error
        if (autor === '') {
            alert('¡Por favor llene el campo del autrode del manga!');
        }
        //Pongo este return para que se salga de la función y no meta datos vacios al arreglo
        return;
    }
    //Se conviert
    mangasArr = JSON.parse(localStorage.getItem('mangasArr'));
    const nuevoManga = {
        nombre: nombre,
        autor: autor
    }
    document.getElementById('nombreManga').value = '';
    document.getElementById('autorManga').value = '';
    mangasArr.push(nuevoManga);
    localStorage.setItem('mangasArr', JSON.stringify(mangasArr));
    mostrarMangas();
}

//Este metodo se manda a llmar para poder que cada que cargue o se refresque la pagina se muestre la lista de los datos de mangasArray
mostrarMangas();