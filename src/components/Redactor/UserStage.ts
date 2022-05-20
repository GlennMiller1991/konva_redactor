import Konva from 'konva'


export class UserStage extends Konva.Stage {
    private layers: {
        field: Konva.Layer | undefined,
        selection: Konva.Layer | undefined,
        scale: Konva.Layer | undefined,
        objects: Konva.Layer[],
    }
    private mouseDownStatus: {
        x: number,
        y: number,
    }

    constructor(config: Konva.StageConfig) {
        super(config)
        this.mouseDownStatus = {
            x: -1000,
            y: -1000,
        }
        this.layers = {
            field: undefined,
            selection: undefined,
            scale: undefined,
            objects: []
        }

        this.addEventListener('dblclick', (event) => {
            console.log('clear state')
            event.cancelBubble = true
        })
        this.addEventListener('mousedown', (event) => {
            const pos = this.getRelativePointerPosition()
            this.mouseDownStatus.x = pos.x
            this.mouseDownStatus.y = pos.y
            console.log(this.mouseDownStatus)
            document.addEventListener('mousemove', this.onSelectionHandler)
            event.cancelBubble = true
        })
        this.addEventListener('mouseup', (event) => {
            this.layers.selection?.destroy()
            delete this.layers.selection
            document.removeEventListener('mousemove', this.onSelectionHandler)
            event.cancelBubble = true
        })
    }

    onSelectionHandler = () => {
        const pos = this.getRelativePointerPosition()
        if (!this.layers.selection) {
            if (Math.abs(pos.x - this.mouseDownStatus.x) > 20 ||
                Math.abs(pos.y - this.mouseDownStatus.y) > 20) {
                this.layers.selection = new Konva.Layer({
                    clearBeforeDraw: true,
                    listening: false,
                })
                const rect = new Konva.Rect({
                    stroke: 'blue',
                    strokeWidth: .3,
                    fill: 'rgba(97,121,222,0.1)',
                    dash: [5, 3],
                    x: this.mouseDownStatus.x,
                    y: this.mouseDownStatus.y,
                })
                this.layers.selection.add(rect)
                this.add(this.layers.selection)
            }
        } else {
            const children = this.layers.selection.getChildren()
            if (children[0]) {
                const rect = children[0] as Konva.Rect
                rect.width(pos.x - this.mouseDownStatus.x)
                rect.height(pos.y - this.mouseDownStatus.y)
            }
        }
    }
}
