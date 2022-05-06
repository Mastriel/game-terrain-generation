import { useState } from "react"
import Game from "../Game"
import { GameSetting, GameSettingProps, GameSettingType } from "./GameSetting"

export type GameSettings = {
    sizeX: number,
    sizeY: number,
    iterations: number
}

export type GameSetting = keyof GameSettings

export function GameComponent() {
    let [gameSettings, setGameSettings] = useState<GameSettings>({
        sizeX: 50,
        sizeY: 50,
        iterations: 10
    })
    let [gameState, setGameState] = useState(new Game(gameSettings.sizeX, gameSettings.sizeY))

    let updateValue = (item: GameSetting, value: GameSettingType) => {
        let copy = gameSettings as any
        copy[item] = value
        setGameSettings(copy as GameSettings)
    }

    return <div>
        <GameSetting<number> label="Size X" defaultValue={50} 
            setter={(value) => {updateValue("sizeX", value)}} 
            getter={() => {return gameSettings.sizeX}}/>
    </div>
}


