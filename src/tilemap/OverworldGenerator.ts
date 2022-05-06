import { TilemapGenerator } from "./TilemapGenerator";




export class OverworldGenerator extends TilemapGenerator {
    

    constructor() {
        super()
    }

    override generate() {
        this.layer_1()
        this.layer_2()
        this.layer_3()
    }

    // grass
    private layer_1() {
        this.forEachTile(() => {
            return "Grass"
        })
    }
    // water 
    private layer_2() {
        this.forEachTile((x, y) => {
            let multi = (this.game.getNeighborQuantities(x, y).Water ?? 0) + 1
            if (Math.random() < 0.1*multi)
                return "Water"
            
            return undefined
        })
        this.forEachTile((x,y) => {
            let a = this.game.getNeighborQuantities(x, y)
            if (Math.random() < 0.5 && a.Water > 1)
                return "Water"
        })
        this.forEachTile((x,y) => {
            let a = this.game.getNeighborQuantities(x, y)
            if (a.Water >= 5)
                return "Water"
            if ((a.Water ?? 0) <= 1)
                return "Grass"
        })
    }

    private layer_3() {
        this.forEachTile((x, y, tile) => {
            let a = this.game.getNeighborQuantities(x, y, true)
            if (a.Water >= 1 && tile == "Grass")
                return "Sand"
            
            return undefined
        })
        this.forEachTile((x, y, tile) => {
            let a = this.game.getNeighborQuantities(x, y)
            if ((a.Grass ?? 0) == 0 && tile == "Sand")
                return "Water"
            
            return undefined
        })
    }
}

//    Italian Herbs and Cheese
//     6 Inches (me simulator)
//             Chicken + Bacon
// Salt, Pepper, Chipotle Baja
//                      Tomato
//                   No Cheese