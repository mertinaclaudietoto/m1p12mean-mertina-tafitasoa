class InvoiceData {
    constructor() {
        this.documentTitle = "FACTURE";
        this.currency = "AR";
        this.taxNotation = "VAT";
        this.marginTop = 25;
        this.marginRight = 25;
        this.marginLeft = 25;
        this.marginBottom = 25;
        this.sender = {
            company: "GARAGE N-TSIKA",
            address: "Andoharanofotsy",
            zip: "101",
            city: "Tananarivo",
            country: "Madagascar",
        };
        this.client = {
            company: "Client Entreprise",
            address: "",
            zip: "101",
            city: "Tananarivo",
            country: "Madagascar",
        };
        this.invoiceNumber = "2024-001";
        this.invoiceDate = "2024-03-26";
        this.products = [
            {
                quantity: 2,
                description: "Ordinateur portable",
                tax: 20,
                price: 800,
            },
            {
                quantity: 1,
                description: "Écran 27 pouces",
                tax: 20,
                price: 300,
            },
        ];
        this.bottomNotice = "Merci pour votre confiance !";
    }
}
module.exports = InvoiceData;

