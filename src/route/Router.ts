import { UserController } from "../controller/UserController";

export class Router {

    private routes: any;
    private controller: UserController

    constructor() {
        this.controller = new UserController();
    }

    public init(express: any) {
        this.routes = express.Router();

        this.routes.route('/users/token')
            .post(this.controller.authenticateUser)
            
        this.routes.route('/users')
            .post(this.controller.createUser)

    }

    public getRoutes() {
        return this.routes;
    }

}

