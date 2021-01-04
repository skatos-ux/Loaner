export default function authHeader(token: string) {
    return { 'x-access-token': token };
}