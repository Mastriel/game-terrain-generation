import { useState } from "react"
import Game from "../Game"
import { OverworldGenerator } from "../tilemap/OverworldGenerator"
import GameGrid from "./GameGrid"
import { GameSetting, GameSettingProps, GameSettingType } from "./GameSetting"

export type GameSettings = {
    size: number,
}

export type GameSetting = keyof GameSettings

export function GameComponent() {
    let [gameSettings, setGameSettings] = useState<GameSettings>({
        size: 25
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


