import Konva from 'konva'

export class UserGroup extends Konva.Circle {

    constructor(config: Konva.CircleConfig) {
        super(config)
        this.addEventListener('dblclick', (event) => {
            console.log('set state with group')
            event.cancelBubble = true
        })
    }
}
