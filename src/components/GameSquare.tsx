


type SquareProps = {
    color: string
}


export default function GameSquare(props: SquareProps) : JSX.Element {
    return (
        <div className="w-3 h-3 border border-slate-500"></div>
    )
}