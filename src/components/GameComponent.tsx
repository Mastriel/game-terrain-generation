import { CSSProperties, useState } from "react"
import Game from "../Game"
import { OverworldGenerator } from "../tilemap/OverworldGenerator"
import { Timer } from "../utils/Timer"
import GameGrid from "./GameGrid"
import { GameSetting, GameSettingProps, GameSettingType } from "./GameSetting"

export type GameSettings = {
    size: number
}

export type GameSetting = keyof GameSettings

export const gameSize = 600

export function GameComponent() {
    let [gameSettings, setGameSettings] = useState<GameSettings>({
<<<<<<< HEAD
        size: 25
=======
        size: 50
>>>>>>> c83c8dc2045155d920d419bf94d470aa36d770a4
    })

    let generator = new OverworldGenerator()
    let game = new Game(gameSettings.size, generator)
    game.generateTilemap()
    let [dummyValue, updateState] = useState(0)

    let updateValue = (item: GameSetting, value: GameSettingType) => {
        let copy = gameSettings as any
        copy[item] = value
        setGameSettings(copy as GameSettings)
    }
    let update = () => {
        updateState(dummyValue + 1)
    }

    let gameGridStyle : CSSProperties = {
        width: gameSize,
        height: gameSize,
    }

    return <div>
        <GameSetting<number> label="Size" defaultValue={50} 
            setter={(value) => {updateValue("size", value)}} 
            getter={() => {return gameSettings.size}}/>
        <button onClick={() => {
            console.log("Attempting regenerate")
            game.generateTilemap()
            update()
        }}>Regenerate</button>
        <GameGrid game={game} updateGame={update} gameSettings={gameSettings}/>
    </div>
}


