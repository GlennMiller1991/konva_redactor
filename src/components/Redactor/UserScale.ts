import Konva from 'konva'
import {UserStage} from './UserStage'
import {StationDto} from './types'
import LayerConfig = Konva.LayerConfig

const kmPxl = 5
const minPxl = 10

interface iUserScale {

}

type tChartConfig = {
    leftGap: number,
    topGap: number,
    rightGap: number,
    bottomGap: number,
    strokeWidth: number,
    strokeColor: string,
    width: number,
    height: number,
    fillColor: string,
}

type tScaleConfig = {
    chartConfig: tChartConfig,
    stage: UserStage,
    stations?: StationDto[],
    time?: number,
    layerConfig?: LayerConfig,
}

export class UserScale extends Konva.Layer {
    private stage: UserStage

    constructor(config: tScaleConfig) {
        super(config.layerConfig)
        this.stage = config.stage
        this.stage.registerScale(this)
        const chartConfig = config.chartConfig
        const line = new Konva.Line({
            points: [
                chartConfig.leftGap, chartConfig.topGap,
                chartConfig.leftGap + chartConfig.width * minPxl, chartConfig.topGap,
                chartConfig.leftGap + chartConfig.width * minPxl, chartConfig.topGap + chartConfig.height * kmPxl,
                chartConfig.leftGap, chartConfig.topGap + chartConfig.height * kmPxl,
            ],
            stroke: 'black',
            strokeWidth: 1,
            closed: true,
            fill: chartConfig.fillColor,
        })
        this.add(line)
        this.stage.add(this)

    }

}