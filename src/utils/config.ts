export default {
    PAYMENTURL: 'https://payment-api.contentionary.com/v1',
    RESULT_PLUGIN:
        process.env.NEXT_RESULT_PLUGIN_URL ||
        'https://result-plugin.herokuapp.com/v1',
    API_URL:
        process.env.NEXT_PUBLIC_API_URL ||
        'https://centre-api.contentionary.com/v1',
    AWS_S3_BUCKET: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    AWS_S3_BASE_URL: process.env.NEXT_PUBLIC_AWS_S3_BASE_URL,
    AWS_S3_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_KEY_ID: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY_ID,
    FILE_MANAGER_DOWNLOAD_URL:
        process.env.NEXT_PUBLIC_FILE_DOWNLOAD_URL ||
        'https://storage.contentionary.com/v1/download?fileUrl=',
    FILE_MANAGER_URL:
        process.env.NEXT_PUBLIC_FILE_MANAGER_URL ||
        'https://storage.contentionary.com/v1',
    FORMATS: {
        VIDEO: 'video',
        AUDIO: 'audio',
        DOCUMENT: 'document',
        IMAGE: 'image',
        OTHERS: 'others',
    },
};

// https://cttn.loca.lt/v1

// https://centre-api.contentionary.com/v1
// https://cttn-centre.herokuapp.com/v1/subscription/pay-with-wallet
