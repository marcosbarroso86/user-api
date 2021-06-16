let express = require('express');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let cors = require('cors');

//For SWAGGER
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');

import {Router} from "./route/Router";

// Create and configure ExpressJS.
export class App {

    private express:any;
    private router:Router;
    
    constructor() {
        this.router = new Router();    
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Config Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json({limit: "50mb"}));
        this.express.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
        this.express.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        this.express.use(methodOverride('X-HTTP-Method-Override'));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    // Init Routes.
    private routes(): void {
        this.router.init(express);
        this.express.use('/api', this.router.getRoutes());        
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    public getExpress:Function = () => {
        return this.express;
    }
}

