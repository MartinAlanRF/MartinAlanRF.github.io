let mostrarMangas = () =>{
    mangasArr = JSON.parse(localStorage.getItem('mangasArr'));
    if( mangasArr === null){
        console.log('entro');
        localStorage.setItem('mangasArr', JSON.stringify([]));
        mangasArr = [];
    }
    document.getElementById('tbodyContent').innerHTML = '';
    mangasArr.forEach((element, index)=>{
        let texth1 = document.createElement('tr');
        texth1.innerHTML= `
        <td scope="row">${index+1}</td>
        <td>${element.nombre}</td>
        <td>${element.autor}</td>
        <td>
            <button type="button" class="btn btn-primary" onclick="rellenarFormulario(${index})">
                Editar
            </button>
            <button type="button" class="btn btn-danger" onclick="eliminarRegistro(${index})">
                Eliminar    
            </button>
        </td>`;
        document.getElementById('tbodyContent').appendChild(texth1);
    });
}

let eliminarRegistro = (idIndex) =>{
    mangasAlmacenados = JSON.parse(localStorage.getItem('mangasArr'));
    mangasAlmacenados = mangasArr.filter((mangas, index)=> index !== idIndex);
    localStorage.setItem('mangasArr', JSON.stringify(mangasAlmacenados));
    mostrarMangas();
}

let rellenarFormulario = (idIndex) =>{
    mangasAlmacenados = JSON.parse(localStorage.getItem('mangasArr'));
    document.getElementById('idIndex').value = idIndex;
    document.getElementById('nombreManga').value = mangasAlmacenados[idIndex].nombre;
    document.getElementById('autorManga').value = mangasAlmacenados[idIndex].autor;
}

let actualizarRegistro = () =>{
    let idManga = document.getElementById('idIndex').value;
    let mangaName = document.getElementById('nombreManga').value;
    let mangaAutor = document.getElementById('autorManga').value;

    if(idManga == '' || isNaN(idManga)){
        alert('Debe seleccionar un registro');
        return false;
    }
    mangasAlmacenados = JSON.parse(localStorage.getItem('mangasArr'));

    mangasAlmacenados [idManga] = {
        nombre: mangaName,
        autor: mangaAutor
    }

    document.getElementById('idIndex').value = '';
    document.getElementById('nombreManga').value = '';
    document.getElementById('autorManga').value = '';

    localStorage.setItem('mangasArr', JSON.stringify(mangasAlmacenados));
    mostrarMangas();
}

let agregarRegistro = () =>{
    mangasArr = JSON.parse(localStorage.getItem('mangasArr'));
    const nuevoManga = {
        nombre: document.getElementById('nombreManga').value,
        autor: document.getElementById('autorManga').value
    }
    // console.log(nuevoManga);
    document.getElementById('nombreManga').value = '';
    document.getElementById('autorManga').value = '';
    mangasArr.push(nuevoManga);
    localStorage.setItem('mangasArr', JSON.stringify(mangasArr));
    mostrarMangas();
}
//Este metodo se manda a llmar para poder que cada que cargue o se refresque la pagina se muestre la lista de los datos de mangasArray
mostrarMangas();