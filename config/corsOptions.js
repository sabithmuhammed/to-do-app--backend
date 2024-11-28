const corsOptions = {
    origin: process.env.CORS_URL,
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
};

export default corsOptions;
