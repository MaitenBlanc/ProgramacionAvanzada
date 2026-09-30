declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        STRIPE_SECRET: string;
        STRIPE_SUCCESS_URL: string;
        STRIPE_CANCEL_URL: string;
        STRIPE_ENDPOINT_SECRET: string;
    }
}