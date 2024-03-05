import mongoose from 'mongoose'
import { ENV, LOCAL_DB, DB_USER, DB_PASS, PROD_DB, DB_NAME } from "@/config/index";

const GetConnectionURL = () => {
    let ConUrl;
    if (ENV === 'development') {
        ConUrl = LOCAL_DB;
        ConUrl = ConUrl.replace("<username>", DB_USER);
        ConUrl = ConUrl.replace("<password>", DB_PASS);
    } else {
        ConUrl = PROD_DB;
    }
    return ConUrl
}
const ConnectionDB = async () => {
    const url = GetConnectionURL()
    console.log(url)
    await mongoose.connect(url, { dbName: DB_NAME })
    console.log("connected to database");
}
module.exports = ConnectionDB