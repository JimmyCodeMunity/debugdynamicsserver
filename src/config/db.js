// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
}

// Cache the connection across warm serverless invocations
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        // Already connected → reuse it
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,           // Fail fast instead of buffering 10s
            serverSelectionTimeoutMS: 5000,  // Don't wait forever
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null; // Reset so next request can retry
        console.error(`Error: ${error.message}`);
        throw error; // Let the route handle it instead of process.exit
    }

    return cached.conn;
};

module.exports = connectDB;