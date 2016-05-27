import * as express from 'express';

import {StaticDispatcher} from '../commons/static/index';


export class Routes {
   static init(app: express.Application, router: express.Router) {


     var routerInit:express.Router = router;
     routerInit
       .route('/')
       .get(StaticDispatcher.sendIndex);

     var routerDeezer:express.Router = router;
     routerDeezer
       .route('/deezerChannel')
       .get(StaticDispatcher.deezerChannel);


     app.use('/', routerInit);
     app.use('/deezerChannel', routerDeezer);
   }
}
