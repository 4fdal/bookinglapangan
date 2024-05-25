import Pelanggan from "./pelanggan";

export default class User {
    constructor({ id, name, email, no_ponsel, password, pelanggan = null }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.no_ponsel = no_ponsel;
        this.password = password;
        this.pelanggan = pelanggan ? new Pelanggan(pelanggan) : null;
    }
}
