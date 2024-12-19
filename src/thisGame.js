/**
 * Función  AutoVersionArchivos
 *          crea str con numero aleatorios de verion 
 * @return 	
 * @author 	Omar Jaramillo
 * @Date	  23-09-2021
*/
function AutoVersionArchivosJuegos(){
    return new Promise(resolve =>{
        let numVersion = Math.random() * (1000 - 1) + 1;
        numVersion = Math.round(numVersion,0);
        let decimalVersion = Math.random() * (10 - 0) + 0;
        decimalVersion = Math.round(decimalVersion,0);
    
        _autoVersionPhaser = `v${numVersion}.${decimalVersion}`; 
        //console.log(_autoVersionPhaser)           
    });        
}

function develop(){
  let niveles = [
    {nombre: "Laboratory", idJuego: 11, nivel: "1",disponible: 'S'},
    {nombre: "Space", idJuego: 11, nivel: "2",disponible: 'S'}
  ]
  //guardar_datos_juegos(niveles);
};

/**
  * Función  	delay
  *           promesa que genera un tiempo de espera         
  * @param    
  * @return 	
  * @author 	Omar Jaramillo
  * @Date		  24-08-2021
*/
function delay(time){
    //console.log("se realiza delay de: "+time+" miliSegundos");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, parseInt(time));
    });
  }