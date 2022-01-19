const drag = document.querySelector('.drag')
const drop = document.querySelector('.drop')

class Figure {
    constructor(color = 'black', shape = 'square', width = 100, height = 100) {
        this.width = width
        this.height = height
        this.color = color
        this.shape = shape
        this.parent = drag

        console.log(this)
    }

    render() {
        const element = document.createElement('div')

        element.classList.add('dragble')
        element.setAttribute('draggable', true)

        element.style.width = `${this.width}px`
        element.style.height = `${this.height}px`
        element.style.background = this.color

        switch (this.shape) {

            case 'circle':
                element.style.borderRadius = '50%';
                console.log(this.shape)
                break;
            case 'square':
                element.style.borderRadius = '0';
                console.log(this.shape)
                break;
            default:
                element.style.borderRadius = '0';
                console.log(this.shape)
                break;
        }

        this.parent.append(element)
    }
}

let arr = [{
    color: 'blue',
    shape: 'square'
}, {
    color: 'green',
    shape: 'circle'
}]

//new Figure('green', 'circle').render()

function fillDrag() {
    arr.forEach(item => {
        new Figure(item.color, item.shape).render()
    })
}
fillDrag()
document.addEventListener()
ball.onmousedown = function(event) {

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    document.body.append(ball);

    moveAt(event.pageX, event.pageY);

    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove);

    // отпустить мяч, удалить ненужные обработчики
    ball.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
    };

};

ball.ondragstart = function() {
    return false;
};