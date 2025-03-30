export interface IArena {
    imagePath: string,
    code: number,
    position: string,
    backgroundColor: string,
    backgroundSize: string,
    name: string
}

export interface IHero {
    id: number,
    arenaCode: number,
    price: number,
    heart: number,
    attack: number,
    attackTime: number,
    heroPath: string,
}

export interface IEnemy {
    id: number,
    arenaCode: number,
    heart: number,
    attack: number,
    attackTime: number,
    heroPath: string,
}