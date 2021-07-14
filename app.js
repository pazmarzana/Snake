document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let appleIndex = 0
    let currentSnake = [2,1,0] // 2=HEAD, 0=TAIL, 1=BODY, guardara en el lugar cero donde estara la cabeza
    let direction = 1
    let score = 0
    let speed = 0.9 //el intervalo de tiempo cada vez sera menor
    let intervalTime = 0 //intervalo de tiempo hasta que realice una funcion, este intervalo cada vez sera menor
    let interval = 0 //es la variable que guardara la funcion que debera realizar y el intervalo de tiempo en el cual debe repetir la funcion

    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }
    
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        scoreDisplay.innerText = score
        randomApple()
        currentIndex = 0 
        currentSnake = [2,1,0]
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        direction = 1
        speed = 0.9
        intervalTime = 1000
        interval = setInterval(moveOutcomes, intervalTime)
    }

    function moveOutcomes(){
        //if snake hits border or himself
        if((direction === width && currentSnake[0] + width >= width * width) ||//bottom
         (direction === 1 && currentSnake[0] % width == width-1) ||//right, ie Im in the last column
         (direction === -1 && currentSnake[0] % width == 0) ||//left
         (direction === -width && currentSnake[0] - width < 0) ||//top
         squares[currentSnake[0] + direction].classList.contains('snake') // it snake hits himself
          ){
              alert('You lost!')
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction) 

        //deals with snake getting an apple
        if (squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake') //se van agregando a la snake
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    //assign functions to keycodes
    function control(e){
        if (e.keyCode === 39){
            direction = 1 // -> derecha
        } else if (e.keyCode === 38){
            direction = -width // ^ arriba, va a la fila anterior, osea resta el ancho en el vector
        } else if (e.keyCode === 37){
            direction = -1 // <- izquierda
        } else if (e.keyCode === 40){
            direction = width // abajo
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)

})