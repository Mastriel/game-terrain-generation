import Game from "../Game";

type GameGridProps = {
    game: Game
    updateGame: () => void
}

export default function GameGrid(props: GameGridProps) : JSX.Element {
    
    return (
        <div>
            {props.game.toJSXElements()}
        </div>
    )
}