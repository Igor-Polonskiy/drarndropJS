const drag = document.querySelector('.drag')
const drop = document.querySelector('.drop')
const text = document.querySelector('span')

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

function fillDrag() {
    arr.forEach(item => {
        new Figure(item.color, item.shape).render()
    })
}

fillDrag()

document.addEventListener('mousedown', (e) => {
    let figure = e.target
    if (e.target.classList == 'dragble') {

        figure.style.position = 'absolute';
        figure.style.zIndex = 1000;
        document.body.append(figure);

        moveAt(e.pageX, e.pageY);
        document.addEventListener('mousemove', onMouseMove);

        function moveAt(pageX, pageY) {

            figure.style.left = pageX - figure.offsetWidth / 2 - 20 + 'px';;
            figure.style.top = pageY - figure.offsetHeight / 2 - 20 + 'px';;
        }

        function countFigures() {
            text.innerText = `${drop.children.length}`
        }

        function onMouseMove(event) {

            moveAt(event.pageX, event.pageY);
            if (figure.getBoundingClientRect().left < 0 || figure.getBoundingClientRect().right > window.innerWidth ||
                figure.getBoundingClientRect().top < 0 || figure.getBoundingClientRect().bottom > window.innerHeight) {

                document.removeEventListener('mousemove', onMouseMove);
                figure.style.position = 'static';
                figure.style.zIndex = 1;
                drag.append(figure)
                countFigures()
            }
        }

        figure.onmouseup = function() {

            document.removeEventListener('mousemove', onMouseMove);

            if (figure.getBoundingClientRect().left > drop.getBoundingClientRect().left &&
                figure.getBoundingClientRect().right < drop.getBoundingClientRect().right &&
                figure.getBoundingClientRect().top > drop.getBoundingClientRect().top &&
                figure.getBoundingClientRect().bottom < drop.getBoundingClientRect().bottom) {
                drop.append(figure)
                countFigures()
            } else {
                figure.style.position = 'static';
                figure.style.zIndex = 1;
                drag.append(figure)
                countFigures()
            }
        };

        figure.ondragstart = function() {
            return false;
        };
    }

})