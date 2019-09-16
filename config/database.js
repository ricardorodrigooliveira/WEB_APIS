module.exports = {
    hrPool: {
        user: process.env.HR_USER,
        password: process.env.HR_PASSWORD,
        connectString: process.env.HR_CONNECTIONSTRING,
        poolMin: 1,
        poolMax: 1,
        poolIncrement: 0
    }
};