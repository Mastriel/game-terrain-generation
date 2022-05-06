import { useState } from "react"
import Game from "../Game"
import { OverworldGenerator } from "../tilemap/OverworldGenerator"
import GameGrid from "./GameGrid"
import { GameSetting, GameSettingProps, GameSettingType } from "./GameSetting"

export type GameSettings = {
    sizeX: number,
    sizeY: number,
}

export type GameSetting = keyof GameSettings

export function GameComponent() {
    let [gameSettings, setGameSettings] = useState<GameSettings>({
        sizeX: 200,
        sizeY: 200
    })
    let generator = new OverworldGenerator()
    let game = new Game(gameSettings.sizeX, gameSettings.sizeY, generator)
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

    return <div>
        <GameSetting<number> label="Size X" defaultValue={50} 
            setter={(value) => {updateValue("sizeX", value)}} 
            getter={() => {return gameSettings.sizeX}}/>
        <button onClick={() => {
            console.log("Attempting regenerate")
            game.generateTilemap()
            update()
        }}>Regenerate</button>
        <GameGrid game={game} updateGame={update}/>
    </div>
}


