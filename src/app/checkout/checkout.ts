export class CheckoutDetails {
    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public address: string = '',
        public contact: number = 0,
        public country: string = '',
        public state: string = '',
        public zipCode: number = 0
    ) { }
}
