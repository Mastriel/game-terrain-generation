import { TilemapGenerator } from "./TilemapGenerator";




export class OverworldGenerator extends TilemapGenerator {
    

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
        // place initial random water
        this.forEachTile((x, y) => {
            let multi = this.game.getNeighborQuantities(x, y).Water + 1
            if (Math.random() < 0.1*multi)
                return "Water"
            
            return undefined
        })
        // merge random water bits to more congealed masses
        this.forEachTile((x,y) => {
            let a = this.game.getNeighborQuantities(x, y)
            if (Math.random() < 0.5 && a.Water > 1)
                return "Water"
        })
        // erase any land that is surrounded by water on all sides
        this.forEachTile((x,y) => {
            let a = this.game.getNeighborQuantities(x, y)
            if (a.Water >= 5)
                return "Water"
            if (a.Water <= 1)
                return "Grass"
        })
    }

    // sand
    private layer_3() {
        // inset outline all grass with sand
        this.forEachTile((x, y, tile) => {
            let a = this.game.getNeighborQuantities(x, y, true)
            if (a.Water >= 1 && tile == "Grass")
                return "Sand"
            
            return undefined
        })
        // delete sand that isn't near atleast 1 grass
        this.forEachTile((x, y, tile) => {
            let a = this.game.getNeighborQuantities(x, y)
            if (a.Grass == 0 && tile == "Sand")
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