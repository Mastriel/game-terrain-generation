import { CSSProperties } from "react"
import { gameSize } from "./GameComponent"



type SquareProps = {
    color: string,
    key: string,
    size: number
}


export default function GameSquare(props: SquareProps) : JSX.Element {
    let style : CSSProperties = {
        backgroundColor: props.color,
        width: `${gameSize/props.size}px`,
        height: `${gameSize/props.size}px`

    }
    return (
        <div style={style} />
    )
}