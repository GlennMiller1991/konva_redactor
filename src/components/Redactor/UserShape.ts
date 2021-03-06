import Konva from 'konva'

interface iUserShape {
    getPosition: () => void,
}
export class UserShape extends Konva.Circle {

    constructor(config: Konva.CircleConfig) {
        super(config)
        this.addEventListener('dblclick', (event) => {
            event.cancelBubble = true
        })
    }

}
