import express from 'express'
import cors from 'cors'
require('dotenv').config()

import checkSlots from './check_slot'

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())


async function loop() {

    await checkSlots()

    setTimeout(loop, 20000); // 20 sec
}


app.listen(process.env.PORT, () => {
    console.log("Server running on port:", process.env.PORT)

    loop()
})


// pm2 start npm --name "COWIN_SLOT_CHECKER" -- start --log run.log      

