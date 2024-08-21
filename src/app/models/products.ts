export class Products {
    constructor(
        public id: number = 0,
        public name: string = '',
        public price: number = 0,
        public painter: string = '',
        public description: string = '',
        public category: string = '',
        public quantity: number = 0,
        public tag: string = '',
        public image: string = '',
        public orderQuantity?: number
    ) { }
}
