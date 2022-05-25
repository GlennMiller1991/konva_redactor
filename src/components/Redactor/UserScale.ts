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
    fillColor: string,
    fontSize: number
}

type tScaleConfig = {
    chartConfig: tChartConfig,
    stage: UserStage,
    hValues?: number[],
    vValues?: number[],
    hCaptions?: string[],
    vCaptions?: string[],
    time?: number,
    layerConfig?: LayerConfig,
}

export class UserScale extends Konva.Layer {
    private stage: UserStage
    private chartConfig: tChartConfig

    constructor(config: tScaleConfig) {
        super(config.layerConfig)
        this.stage = config.stage
        this.stage.registerScale(this)
        this.chartConfig = config.chartConfig
        this.stage.add(this)
        if (config.hValues && config.vValues) {
            this.drawBorder(config.hValues, config.vValues)
            const width = (config.hValues[config.hValues.length - 1] - config.hValues[0]) * minPxl
            const height = (config.vValues[config.vValues.length - 1] - config.vValues[0]) * kmPxl

            this.drawNet('x', config.hValues, height)
            this.drawNet('y', config.vValues, width)
            if (config.hCaptions) {
                this.drawCaptions('x', config.hValues, config.hCaptions, height)
            }
            if (config.vCaptions) {
                this.drawCaptions('y', config.vValues, config.vCaptions, width)
            }
        }
    }

    drawBorder(hValues: number[], vValues: number[]) {
        const vFirst = vValues[0]
        const hFirst = hValues[0]
        const vLast = vValues[vValues.length -1]
        const hLast = hValues[hValues.length -1]
        const leftTop = [hFirst, vFirst]
        const rightBottom = [hLast, vLast]
        const diffH = rightBottom[0] - leftTop[0]
        const lengthH = diffH * minPxl
        const diffV = rightBottom[1] - leftTop[1]
        const lengthV = diffV * kmPxl
        const points = [
            this.chartConfig.leftGap, this.chartConfig.topGap,
            this.chartConfig.leftGap + lengthH, this.chartConfig.topGap,
            this.chartConfig.leftGap + lengthH, this.chartConfig.topGap + lengthV,
            this.chartConfig.leftGap, this.chartConfig.topGap + lengthV,
        ]
        const line = new Konva.Line({
            points,
            stroke: 'black',
            strokeWidth: 1,
            closed: true,
            fill: this.chartConfig.fillColor,
        })
        this.add(line)
    }
    drawNet(side: 'x' | 'y', coords: number[], len: number) {
        let lines: Konva.Line[] = []
        if (side === 'x') {
            for (let i = 0; i < coords.length; i++) {
                const point = this.chartConfig.leftGap + coords[i] * (i === 0 ? 0 : minPxl)
                const points = [
                    point, this.chartConfig.topGap + len,
                    point, this.chartConfig.topGap,
                ]
                const line = new Konva.Line({
                    points: points,
                    strokeWidth: .5,
                    stroke: 'black',
                })
                lines.push(line)
            }
        } else {
            for (let i = 0; i < coords.length; i++) {
                const point = this.chartConfig.topGap + coords[i] * (i === 0 ? 0 : kmPxl)
                const points = [
                    this.chartConfig.leftGap, point,
                    this.chartConfig.leftGap + len, point,
                ]
                const line = new Konva.Line({
                    points: points,
                    strokeWidth: .5,
                    stroke: 'black',
                })
                lines.push(line)
            }
        }

        this.add(...lines)
    }
    drawCaptions(side: 'x' | 'y', coords: number[], captions: string[], len: number) {
        let texts: Konva.Text[] = []
        if (side === 'x') {
            for (let i = 0; i < coords.length; i++) {
                const x = this.chartConfig.leftGap + coords[i] * (i === 0 ? 0 : minPxl)
                const yOne = this.chartConfig.topGap - this.chartConfig.fontSize - 3
                const yTwo = this.chartConfig.topGap + len + 3
                const caption = captions[i]
                const textWidth = caption.length * this.chartConfig.fontSize
                const textOne = new Konva.Text({
                    x: x - textWidth/2, y: yOne,
                    text: caption,
                    width: textWidth,
                    align: 'center',
                    color: 'black',
                    fontSize: this.chartConfig.fontSize,
                    fontFamily: 'monospace',
                })
                const textTwo = new Konva.Text({
                    x: x - textWidth/2, y: yTwo,
                    text: caption,
                    width: textWidth,
                    align: 'center',
                    color: 'black',
                    fontSize: this.chartConfig.fontSize,
                    fontFamily: 'monospace',
                })
                texts.push(textOne, textTwo)
            }
        }
        else {
            for (let i = 0; i < coords.length; i++) {
                const xOne = this.chartConfig.leftGap - 3
                const xTwo = this.chartConfig.leftGap + len + 3
                const y = this.chartConfig.topGap + (coords[i] * (i === 0 ? 0 : kmPxl)) - this.chartConfig.fontSize /2
                debugger
                const caption = captions[i]
                const textWidth = caption.length * this.chartConfig.fontSize
                const textOne = new Konva.Text({
                    x: xOne - textWidth, y,
                    text: caption,
                    width: textWidth,
                    align: 'right',
                    color: 'black',
                    fontSize: this.chartConfig.fontSize,
                    fontFamily: 'monospace',
                })
                const textTwo = new Konva.Text({
                    x: xTwo, y,
                    text: caption,
                    width: textWidth,
                    align: 'left',
                    color: 'black',
                    fontSize: this.chartConfig.fontSize,
                    fontFamily: 'monospace',
                })
                texts.push(textOne, textTwo)
            }
        }
        this.add(...texts)
    }
}