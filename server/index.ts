import './common/env';
import Server from './common/server';
import routes from './routes';
import db from './api/models';
const port = parseInt(process.env.PORT ?? '3000');


const syncdb = (process.env.SYNC_DB_SCHEMA_ON_STARTUP ?? 'false') === 'true';

if (syncdb) {
    db.sequelize.sync({ force: true }).then(() => {
        console.log("DB Aggiornato");
    }).catch((err: any) => {
        console.log("Errore", err)
    });
}


export default new Server().router(routes).listen(port);