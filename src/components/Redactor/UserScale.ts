import Konva from 'konva'
import {UserStage} from './UserStage'
import {StationDto} from './types'
import LayerConfig = Konva.LayerConfig

interface iUserScale {

}

type tScaleConfig = {
    stage: UserStage,
    stations?: StationDto[],
    time?: number,
    layerConfig?: LayerConfig,
}

export class UserScale extends Konva.Layer {
    private stage: UserStage
    public delimeters: {
        horizontalDelimeter: number,
        verticalDelimeter: number,
    }


    constructor(config: tScaleConfig) {
        super(config.layerConfig)
        this.stage = config.stage
        this.stage.registerScale(this)
        this.delimeters = {
            horizontalDelimeter: 5,
            verticalDelimeter: 0,
        }
        const line = new Konva.Line({
            points: [10, 10, 2000, 10],
            stroke: 'black',
            strokeWidth: 3,
        })
        this.add(line)
        this.stage.add(this)

    }

}