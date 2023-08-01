var torre1 = 1;
var torre2 = 2;
var torre3 = 3;
var torre4 = null;
var n = 5; //numero de discos



function hanoi(n, torre1, torre2, torre3) {
  if (n == 1) {
    var move = "Mueva el disco " + n + " desde la torre " + torre1 + " hasta la torre " + torre2;
    var moveElement = document.createElement('p');
    moveElement.textContent = move;
    document.getElementById('solution').appendChild(moveElement);
  } 
  else {
    hanoi(n - 1, torre1, torre3, torre2);
    var move = "Mueva el disco " + n + " desde la torre " + torre1 + " hasta la torre " + torre2;
    var moveElement = document.createElement('p');
    moveElement.textContent = move;
    document.getElementById('solution').appendChild(moveElement);
    hanoi(n - 1, torre3, torre2, torre1);
  }
}

function limpiar(){
  document.getElementById('solution').innerHTML = "";
}


// hanoi(3, "A", "B", "C");

// Inicialización de los discos en la torre 1
function dibujar() {
  var tower1 = document.getElementById('tower1');
  document.getElementById('tower1').innerHTML = "";
  document.getElementById('tower2').innerHTML = "";
  document.getElementById('tower3').innerHTML = "";

  var disks = [];
  var numero = document.getElementById('discos').value;
  var i = 1;
  while (numero >= i) {
    disks.push(numero); // Se declara el arreglo inicial, o torre inicial
    numero--;
  }
  
  for (var i = 0; i < disks.length; i++) {
      var disk = document.createElement('div');
      disk.className = 'disk';
      disk.id = 'disk' + disks[i]; // Agrega el ID al disco
      disk.style.width = (disks[i] * 30) + 'px';
      disk.draggable = true;
      disk.ondragstart = drag;
      tower1.appendChild(disk);
  }
  torre4 = document.getElementById('tower1').innerHTML;
}

function reiniciar() {
  document.getElementById('tower1').innerHTML = ""; 
  document.getElementById('tower2').innerHTML = ""; 
  document.getElementById('tower3').innerHTML = ""; 
  document.getElementById('solution').innerHTML = "";
  document.getElementById('discos').value = ""; 
}

// Función para iniciar el arrastre del disco
function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Función para permitir soltar el disco en una torre
function allowDrop(event) {
    event.preventDefault();
}

// Función para soltar el disco en una torre
function drop(event) {
  event.preventDefault();
  var diskId = event.dataTransfer.getData("text/plain");
  var disk = document.getElementById(diskId);
  var targetTower = event.target.closest(".tower");
  
  if (targetTower && targetTower.nodeType === Node.ELEMENT_NODE) {
      var lastDisk = targetTower.lastElementChild;
      var lastDiskSize = lastDisk ? parseInt(lastDisk.style.width, 10) / 30 : 0;
      var diskSize = parseInt(disk.style.width, 10) / 30;
      
      if (!lastDisk || diskSize < lastDiskSize) {
          targetTower.appendChild(disk);
      } else {
        Swal.fire({
          icon: 'ERROR',
          title: 'VERIFICA EL MOVIMIENTO',
          text: 'NO SE PUEDE COLOCAR UN DISCO GRANDE SOBRE UNO PEQUEÑO!',
        });
      }
  }

  torre2 = document.getElementById('tower2').innerHTML;
  torre3 = document.getElementById('tower3').innerHTML;
  console.log(torre4);
  console.log(torre2);
  console.log(torre3);

  if(torre4 == torre2 || torre4 == torre3)
  {
    Swal.fire({
      title: 'FELICITACIONES!',
      text: 'Haz terminado las Torres de Hanoi.',
      imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/007/943/387/small/congrats-lettering-greeting-sign-handwritten-modern-brush-lettering-vector.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
}
}
// Función recursiva para resolver las Torres de Hanoi
function hanoiNG(n, source, auxiliary, target) {
    if (n > 0) {
        hanoi(n - 1, source, target, auxiliary);
        moveDisk(source, target);
        hanoi(n - 1, auxiliary, source, target);
    }
}

// Función para mover un disco de una torre a otra
function moveDisk(source, target) {
    var sourceTower = document.getElementById('tower' + source);
    var targetTower = document.getElementById('tower' + target);
    
    var disk = sourceTower.lastElementChild;
    sourceTower.removeChild(disk);
    
    targetTower.appendChild(disk);


}

// Llamada inicial para resolver las Torres de Hanoi con 3 discos
// hanoi(3, 1, 2, 3);



