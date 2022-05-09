import Game, { Tile } from "../Game"
import { OverworldGenerator } from "./OverworldGenerator"



export abstract class TilemapGenerator {

    public static get GENERATORS() : TilemapGenerator[] { 
        return [
            new OverworldGenerator()
        ]
    }
    
    private _game? : Game
    
    public get sizeX() : number { return this._game!.sizeX }
    public get sizeY() : number { return this._game!.sizeY }

    set game(value: Game) {
        this._game = value
    }
    get game() : Game {
        return this._game!
    }

    constructor() {
        
    }

    public abstract generate() : void

    protected requireInit() {
        if (!this._game) {
            throw new Error("Game not initialized.")
        }
    }

    protected getRandomTilePosition() : [number, number] {
        let x = this.randomInt(0, this.sizeX-1)
        let y = this.randomInt(0, this.sizeY-1)
        return [x, y]
    }

    protected forEachTile(block: (x: number, y: number, tile: Tile) => Tile | undefined | void) {
        for (let i = 0; i < this.sizeY; i++) {
            for (let i2 = 0; i2 < this.sizeX; i2++) {
                let result = block(i, i2, this.game.getTileAt(i, i2)!)
                if (result !== undefined)
                    this.game.setTileAt(i, i2, result)
            }
        }
    }

    protected randomInt(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}