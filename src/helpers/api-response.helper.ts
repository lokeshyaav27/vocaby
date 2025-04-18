export class ApiResponseHelper {
    static success<T>(data: T, message: string = 'Success') {
        return {
            status: true,
            message,
            data,
            timestamp: new Date().toISOString(),
        };
    }

    static error(message: string = 'Error', errors: any = null) {
        return {
            status: false,
            message,
            errors,
            timestamp: new Date().toISOString(),
        };
    }
}