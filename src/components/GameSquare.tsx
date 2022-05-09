import { CSSProperties } from "react"



type SquareProps = {
    color: string,
    key: string
}

/** @deprecated */
export default function GameSquare(props: SquareProps) : JSX.Element {
    let style : CSSProperties = {
        backgroundColor: props.color
    }
    return (
        <div className="w-2 h-2 border border-slate-500" style={style} />
    )
}