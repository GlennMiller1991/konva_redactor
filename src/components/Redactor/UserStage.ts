import Konva from 'konva'

export class UserStage extends Konva.Stage {

    constructor(config: Konva.StageConfig) {
        super(config)
        this.addEventListener('dblclick', (event) => {
            console.log('clear state')
            event.cancelBubble = true
        })
    }
}
