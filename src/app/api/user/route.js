import userModel from "@/models/user";
import ConnectionDB from "@/utils/DB_connection";
import bcrypt from 'bcrypt';
export async function POST(request) {
    try {
        await ConnectionDB()
        const data = await request.json()
        const password = data.password;
        const salt = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(password, salt);
        data.password = hash_pass;
        const result = await userModel.create(data);
        return Response.json({ success: true, data: result });
    } catch (err) {
        console.log(err);
        return Response.json({ success: false, msg: 'unable to register user' });
    }
}

//login
export async function GET(request) {
    try {
        await ConnectionDB()
        const email = request.nextUrl.searchParams.get('email');
        const password = request.nextUrl.searchParams.get('password');
        console.log(email, password)
        const result = await userModel.findOne({ email: email });
        const isMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(password, result?.password, (err, ismatch) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(ismatch);
                }
            });
        });

        if (isMatch) {
            return Response.json({ success: true, data: result });
        } else {
            return Response.json({ success: false, msg: "Password doesn't match" });
        }
    } catch (err) {
        console.log(err);
        return Response.json({ success: false, msg: 'unable to get user data' });
    }
};

// export const runtime = "edge" 