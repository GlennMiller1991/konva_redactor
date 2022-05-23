import Konva from 'konva'
import {UserStage} from './UserStage'
import {StationDto} from './types'

interface iUserScale {

}

type tScaleConfig = {
    name: string,
    stage: UserStage,
    stations?: StationDto[],
}

export class UserScale implements iUserScale {
    private name: string
    private stage: UserStage
    private layer: Konva.Layer | undefined
    public delimeters: {
        horizontalDelimeter: number,
        verticalDelimeter: number,
    }


    constructor(config: tScaleConfig) {
        this.name = config.name
        this.stage = config.stage
        this.layer = new Konva.Layer()
        this.stage.registerScale(this.layer)
        this.delimeters = {
            horizontalDelimeter: 5,
            verticalDelimeter: 0,
        }
    }

}