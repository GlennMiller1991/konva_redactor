import Konva from 'konva'

export class UserShape extends Konva.Circle {

    constructor(config: Konva.CircleConfig) {
        super(config)
        this.addEventListener('dblclick', (event) => {
            console.log('set state')
            event.cancelBubble = true
        })
    }
}
