import { useEffect, useRef } from "react";
import Game, { getTileColor } from "../Game";
import { GameSettings } from "./GameComponent";

type GameGridProps = {
    game: Game,
    updateGame: () => void,
    gameSettings: GameSettings
}

const GRID_SIZE = 400

export default function GameGrid(props: GameGridProps) : JSX.Element {
    let canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            drawCanvas(props.game, canvasRef.current, props.gameSettings)
        }
    }, [canvasRef, props.game])

    return (
        <div>
            <canvas ref={canvasRef} height={GRID_SIZE} width={GRID_SIZE} />
        </div>
    )
}

function drawCanvas(game: Game, canvas: HTMLCanvasElement, settings: GameSettings) {
    let ctx = canvas.getContext("2d")!
    let squareSize = GRID_SIZE / settings.size 
    game.forEachTile((x, y, tile) => {
        ctx.fillStyle = getTileColor(tile)
        ctx.fillRect(squareSize*x, squareSize*y, squareSize, squareSize)
    })
}