const drag = document.querySelector('.drag')
const drop = document.querySelector('.drop')
const text = document.querySelector('h3')

class Figure {
    constructor(color = 'black', shape = 'square', width = 100, height = 100) {
        this.width = width
        this.height = height
        this.color = color
        this.shape = shape
        this.parent = drag
    }
    render() {
        const element = document.createElement('div')
        element.classList.add('dragble')
        element.style.width = `${this.width}px`
        element.style.height = `${this.height}px`
        element.style.background = this.color
        element.style.zIndex = '2'

        switch (this.shape) {
            case 'circle':
                element.style.borderRadius = '50%';
                break;
            case 'square':
                element.style.borderRadius = '0';
                break;
            default:
                element.style.borderRadius = '0';
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

document.addEventListener('mousedown', (e) => {
    let figure = e.target
    if (e.target.classList == 'dragble') {
        //let shiftX = event.clientX - figure.getBoundingClientRect().left;
        //let shiftY = event.clientY - figure.getBoundingClientRect().top;

        figure.style.position = 'absolute';
        figure.style.zIndex = 1000;
        document.body.append(figure);

        moveAt(e.pageX, e.pageY);

        // переносит мяч на координаты (pageX, pageY),
        // дополнительно учитывая изначальный сдвиг относительно указателя мыши
        function moveAt(pageX, pageY) {
            console.log(figure.offsetWidth / 2)
            figure.style.left = pageX - figure.offsetWidth / 2 + 'px';;
            figure.style.top = pageY - figure.offsetHeight / 2 + 'px';;
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            document.addEventListener('mouseleave', () => {
                console.log('leave')
                figure.style.position = 'static';
                figure.style.zIndex = 1;
                drag.append(figure)
            });

            if (event.clientX < figure.getBoundingClientRect().left &&
                event.clientX > figure.getBoundingClientRect().right &&
                event.clientY < figure.getBoundingClientRect().top &&
                event.clientY > figure.getBoundingClientRect().bottom
            ) {
                figure.style.position = 'static';
                figure.style.zIndex = 1;
                drag.append(figure)
            } else {

            }
        }

        // передвигаем мяч при событии mousemove
        document.addEventListener('mousemove', onMouseMove);

        // отпустить мяч, удалить ненужные обработчики
        figure.onmouseup = function() {

            document.removeEventListener('mousemove', onMouseMove);
            if (figure.getBoundingClientRect().left > drop.getBoundingClientRect().left &&
                figure.getBoundingClientRect().right < drop.getBoundingClientRect().right &&
                figure.getBoundingClientRect().top > drop.getBoundingClientRect().top &&
                figure.getBoundingClientRect().bottom < drop.getBoundingClientRect().bottom) {
                drop.append(figure)
            } else {
                figure.style.position = 'static';
                figure.style.zIndex = 1;
                drag.append(figure)
            }


            //figure.onmouseup = null;
        };


        figure.ondragstart = function() {
            return false;
        };
    }

})